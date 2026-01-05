import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';

import { RestEffects } from './rest.effects';
import { RestClient } from './rest.service';
import { receivedResponse, sendGetRequest, sendPostRequest } from './rest.actions';
import { addToken, removeToken } from '../auth/auth.actions';
import { go } from '../router/router.actions';

describe('RestEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: RestEffects;
  let restClient: jasmine.SpyObj<RestClient>;

  beforeEach(() => {
    restClient = jasmine.createSpyObj('RestClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        RestEffects,
        { provide: RestClient, useValue: restClient },
        provideMockActions(() => actions$ as unknown as Observable<Action>),
      ],
    });

    effects = TestBed.inject(RestEffects);
    actions$ = new ReplaySubject<Action>(1);
  });

  describe('sendGetRequest$', () => {
    it('emits receivedResponse on success', (done) => {
      const response = { status: 200, body: [] as any[] };
      restClient.get.and.returnValue(of(response));
      actions$.next(sendGetRequest({ schema: 'auth', path: '/things' }));

      effects.sendGetRequest$.subscribe(action => {
        expect(action).toEqual(receivedResponse({ response }));
        done();
      });
    });

    it('emits receivedResponse on error', (done) => {
      const error = { status: 500, message: 'boom' };
      restClient.get.and.returnValue(throwError(() => error));
      actions$.next(sendGetRequest({ schema: 'auth', path: '/things' }));

      effects.sendGetRequest$.subscribe(action => {
        expect(action).toEqual(receivedResponse({ response: error as any }));
        done();
      });
    });
  });

  describe('sendPostRequest$', () => {
    it('emits receivedResponse on post success', (done) => {
      const response = { status: 200, body: [{ id: 1 }] as any };
      restClient.post.and.returnValue(of(response));
      actions$.next(sendPostRequest({ schemaName: 'auth', formName: 'login', data: {} }));

      effects.sendPostRequest$.subscribe(action => {
        expect(action).toEqual(receivedResponse({ response }));
        done();
      });
    });

    it('emits receivedResponse on post error', (done) => {
      const error = { status: 400, message: 'Bad' };
      restClient.post.and.returnValue(throwError(() => error));
      actions$.next(sendPostRequest({ schemaName: 'auth', formName: 'login', data: {} }));

      effects.sendPostRequest$.subscribe(action => {
        expect(action).toEqual(receivedResponse({ response: error as any }));
        done();
      });
    });
  });

  describe('processResponse$', () => {
    it('emits addToken for login success', (done) => {
      actions$.next(receivedResponse({
        response: {
          status: 200,
          url: 'https://api.rochard.org/rpc/login',
          body: [{ token: 'abc' }] as any,
        } as any,
      }));

      effects.processResponse$.subscribe(action => {
        expect(action).toEqual(addToken({ token: 'abc' }));
        done();
      });
    });

    it('emits removeToken and go on expired JWT', (done) => {
      actions$.next(receivedResponse({
        response: { status: 401, message: 'JWT expired' } as any,
      }));

      const seen: Action[] = [];
      effects.processResponse$.subscribe({
        next: (action) => {
          seen.push(action);
          if (seen.length === 2) {
            expect(seen).toEqual([removeToken(), go({ path: ['/rpc/login'] })]);
            done();
          }
        },
      });
    });

    it('emits nothing on non-handled status', (done) => {
      actions$.next(receivedResponse({
        response: { status: 204 } as any,
      }));

      const emitted: Action[] = [];
      effects.processResponse$.subscribe({
        next: action => emitted.push(action),
      });

      setTimeout(() => {
        expect(emitted.length).toBe(0);
        done();
      }, 0);
    });
  });
});
