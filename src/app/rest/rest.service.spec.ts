import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, NEVER, TimeoutError } from 'rxjs';

import { RestClient } from './rest.service';
import { REST_CONFIG, RestConfig } from './rest.config';

describe('RestClient', () => {
  let service: RestClient;
  let httpMock: HttpTestingController;
  let state$: BehaviorSubject<any>;

  const restConfig: RestConfig = {
    apiBaseTemplate: 'http://api.test/{schema}',
    defaultTimeoutMs: 100,
    retryCount: 1,
    retryDelayMs: 0,
  };

  beforeEach(() => {
    state$ = new BehaviorSubject({ auth: { token: 'abc' } });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestClient,
        { provide: REST_CONFIG, useValue: restConfig },
        {
          provide: Store,
          useValue: {
            pipe: (...ops: any[]) => (state$ as any).pipe(...ops as any),
          },
        },
      ],
    });
    service = TestBed.inject(RestClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('attaches auth headers and prefer/count params for GET', fakeAsync(() => {
    let result: any;
    service.get('auth', '/data').subscribe(res => { result = res; });
    flushMicrotasks();
    tick();

    const first = httpMock.expectOne(req => req.url.includes('/data'));
    expect(first.request.headers.get('Authorization')).toBe('Bearer abc');
    expect(first.request.headers.get('prefer')).toBe('count=exact');

    first.flush({ ok: true }, { status: 200, statusText: 'OK' });

    expect((result as any).status).toBe(200);
  }));

  it('omits Authorization header when no token is present', fakeAsync(() => {
    state$.next({ auth: { token: null } });
    service.get('auth', '/data').subscribe();
    flushMicrotasks();
    tick();

    const request = httpMock.expectOne(req => req.url.includes('/data'));
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush({}, { status: 200, statusText: 'OK' });
  }));

  it('merges params and preserves response shape for various statuses', fakeAsync(() => {
    let response: any;
    service.get('auth', '/with-params', new HttpParams().set('id', '1')).subscribe(res => response = res);
    flushMicrotasks();
    tick();

    const req = httpMock.expectOne(r => r.url.includes('/with-params') && r.params.get('id') === '1');

    req.flush({ rows: [] }, { status: 204, statusText: 'No Content' });
    expect(response.status).toBe(204);
  }));

  it('retries the configured number of times before failing', fakeAsync(() => {
    let error: HttpErrorResponse | undefined;
    service.get('auth', '/retry').subscribe({ error: err => error = err });
    flushMicrotasks();
    tick();

    const first = httpMock.expectOne(req => req.url.includes('/retry'));
    first.flush('error', { status: 500, statusText: 'Server Error' });
    tick(restConfig.retryDelayMs + 1);

    const second = httpMock.expectOne(req => req.url.includes('/retry'));
    second.flush('error', { status: 500, statusText: 'Server Error' });

    expect(error).toBeDefined();
    expect(error?.status).toBe(500);
  }));

  it('errors on timeout after defaultTimeoutMs', fakeAsync(() => {
    const originalRetryCount = (service as any).restConfig.retryCount;
    (service as any).restConfig.retryCount = 0;
    let error: TimeoutError | undefined;
    (service as any).withCommonConfig(NEVER).subscribe({ error: (err: any) => error = err as TimeoutError });
    tick(restConfig.defaultTimeoutMs + 1);

    expect(error).toBeDefined();
    expect(error?.name).toBe('TimeoutError');
    (service as any).restConfig.retryCount = originalRetryCount;
  }));
});
