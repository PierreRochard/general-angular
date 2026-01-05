import { createReducer, on } from '@ngrx/store';
import { addToken, removeToken } from './auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(addToken, (state, { token }) => ({ ...state, token })),
  on(removeToken, state => ({ ...state, token: null as null })),
);
