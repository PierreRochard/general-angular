import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';

import { RestEffects } from './rest.effects';
import { RestClient } from './rest.service';
import { REST_CONFIG, RestConfig } from './rest.config';
import { receivedResponse, sendGetRequest, sendPostRequest } from './rest.actions';

describe('RestEffects + RestClient HTTP integration', () => {
  let actions$: ReplaySubject<Action>;
  let effects: RestEffects;
  let httpMock: HttpTestingController;

  const restConfig: RestConfig = {
    apiBaseTemplate: 'http://api.test/{schema}',
    defaultTimeoutMs: 500,
    retryCount: 0,
    retryDelayMs: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestEffects,
        RestClient,
        { provide: REST_CONFIG, useValue: restConfig },
        provideMockStore({ initialState: { auth: { token: 'token-xyz' } } as any }),
        provideMockActions(() => actions$ as unknown as Observable<Action>),
      ],
    });

    effects = TestBed.inject(RestEffects);
    httpMock = TestBed.inject(HttpTestingController);
    actions$ = new ReplaySubject<Action>(1);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('propagates Authorization headers through GET effect', (done) => {
    effects.sendGetRequest$.subscribe(action => {
      expect(action).toEqual(receivedResponse({ response: jasmine.objectContaining({ status: 200, body }) as any }));
      done();
    });

    const body = [{ id: 1 }];
    actions$.next(sendGetRequest({ schema: 'auth', path: '/records' }));

    const req = httpMock.expectOne('http://api.test/auth/records');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token-xyz');
    expect(req.request.headers.get('prefer')).toBe('count=exact');

    req.flush(body, { status: 200, statusText: 'OK' });
  });

  it('emits error response when POST fails', (done) => {
    effects.sendPostRequest$.subscribe(action => {
      expect(action.type).toBe(receivedResponse.type);
      expect((action as any).response.status).toBe(500);
      done();
    });

    actions$.next(sendPostRequest({ schemaName: 'auth', formName: 'login', data: { email: 'a' } }));

    const req = httpMock.expectOne('http://api.test/auth/rpc/login');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token-xyz');
    expect(req.request.headers.get('prefer')).toBe('return=representation');

    req.flush({ message: 'bad' }, { status: 500, statusText: 'Server Error' });
  });
});
