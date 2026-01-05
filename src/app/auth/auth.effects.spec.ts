import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from './auth.service';
import { addToken, sendLoginPostRequest } from './auth.actions';
import { receivedResponse } from '../rest/rest.actions';

describe('AuthEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: AuthEffects;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['post_login']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: AuthService, useValue: authServiceSpy },
        provideMockActions(() => actions$ as unknown as Observable<Action>),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>(1);
  });

  it('emits addToken on successful login', (done) => {
    authServiceSpy.post_login.and.returnValue(of({ body: [{ token: 'abc' }] }));
    actions$.next(sendLoginPostRequest({
      payload: { schemaName: 'auth', formName: 'login', data: { username: 'u', password: 'p' } },
    }));

    effects.sendPostRequest$.subscribe(action => {
      expect(action).toEqual(addToken({ token: 'abc' }));
      done();
    });
  });

  it('emits receivedResponse on login error', (done) => {
    const httpError = { status: 500, message: 'Server error' };
    authServiceSpy.post_login.and.returnValue(throwError(() => httpError));
    actions$.next(sendLoginPostRequest({
      payload: { schemaName: 'auth', formName: 'login', data: { username: 'u', password: 'p' } },
    }));

    effects.sendPostRequest$.subscribe(action => {
      expect(action).toEqual(receivedResponse({ response: httpError as any }));
      done();
    });
  });
});
