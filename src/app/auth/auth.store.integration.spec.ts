import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';

import { AuthState, authReducer } from './auth.reducers';
import { addToken, removeToken } from './auth.actions';
import { selectToken } from './auth.selectors';

describe('Auth store integration', () => {
  it('adds and removes token and exposes it via selector', async () => {
    const initial: AuthState = { token: null };
    const stateWithToken = authReducer(initial, addToken({ token: 'abc' }));
    expect(selectToken.projector(stateWithToken)).toBe('abc');
    const cleared = authReducer(stateWithToken, removeToken());
    expect(selectToken.projector(cleared)).toBeNull();
  });
});
