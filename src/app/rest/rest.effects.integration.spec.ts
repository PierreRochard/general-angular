import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, ReplaySubject, of } from 'rxjs';

import { RestEffects } from './rest.effects';
import { RestClient } from './rest.service';
import { receivedResponse, sendGetRequest } from './rest.actions';
import { removeToken } from '../auth/auth.actions';
import { go } from '../router/router.actions';

describe('RestEffects integration with auth/router handling', () => {
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

  it('dispatches removeToken and router go on JWT expired', (done) => {
    actions$.next(receivedResponse({ response: { status: 401, message: 'JWT expired' } as any }));

    const seen: Action[] = [];
    effects.processResponse$.subscribe(action => {
      seen.push(action);
      if (seen.length === 2) {
        expect(seen).toEqual([removeToken(), go({ path: ['/rpc/login'] })]);
        done();
      }
    });
  });

  it('no-ops on 204 response', (done) => {
    actions$.next(receivedResponse({ response: { status: 204 } as any }));
    const emitted: Action[] = [];
    const sub = effects.processResponse$.subscribe(action => emitted.push(action));
    setTimeout(() => {
      expect(emitted.length).toBe(0);
      sub.unsubscribe();
      done();
    }, 0);
  });
});
