import {AuthActions, AuthActionTypes} from './auth.actions';

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: null,
};

export function authReducer (state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.ADD_TOKEN:
      return Object.assign({}, state, { token: action.payload });
    case AuthActionTypes.REMOVE_TOKEN:
      return Object.assign({}, state, { token: null});
    default:
      return state;
  }
}

