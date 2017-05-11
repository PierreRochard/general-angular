import {Action} from '@ngrx/store';

import {type} from '../util';

export const AuthActionTypes = {
  ADD_TOKEN:     type('ADD_TOKEN'),
  REMOVE_TOKEN:  type('REMOVE_TOKEN'),
};

export class AddTokenAction implements Action {
  type = AuthActionTypes.ADD_TOKEN;
  constructor(public payload: string) { }
}

export class RemoveTokenAction implements Action {
  type = AuthActionTypes.REMOVE_TOKEN;
  constructor(public payload: string) { }
}

export type AuthActions = AddTokenAction | RemoveTokenAction;
