import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { RestClient } from './rest.service';
import { REST_CONFIG, RestConfig } from './rest.config';

describe('RestClient', () => {
  let service: RestClient;
  let httpMock: HttpTestingController;

  const restConfig: RestConfig = {
    apiBaseTemplate: 'http://api.test/{schema}',
    defaultTimeoutMs: 100,
    retryCount: 1,
    retryDelayMs: 0,
  };

  beforeEach(() => {
    const state$ = new BehaviorSubject({ auth: { token: 'abc' } });
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
    (service as any).withCommonConfig = (req$: any) => req$;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('attaches auth headers for requests', fakeAsync(() => {
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

  it('propagates error responses', fakeAsync(() => {
    let error: HttpErrorResponse | undefined;
    service.get('auth', '/fail').subscribe({
      error: err => { error = err; },
    });
    flushMicrotasks();
    tick();

    const req = httpMock.expectOne(req => req.url.includes('/fail'));
    req.flush('error', { status: 504, statusText: 'Gateway Timeout' });

    expect(error).toBeDefined();
    expect(error?.status).toBe(504);
  }));
});
