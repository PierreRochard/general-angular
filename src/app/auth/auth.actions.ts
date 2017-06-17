import {Action} from '@ngrx/store';

import {type} from '../util';
import {SendLoginPostRequestPayload} from "./auth.models";

export const AuthActionTypes = {
  ADD_TOKEN:                type('ADD_TOKEN'),
  REMOVE_TOKEN:             type('REMOVE_TOKEN'),
  SEND_LOGIN_POST_REQUEST:  type('SEND_LOGIN_POST_REQUEST'),
};

export class SendLoginPostRequestAction implements Action {
  type = AuthActionTypes.SEND_LOGIN_POST_REQUEST;
  constructor(public payload: SendLoginPostRequestPayload) { }
}

export class AddTokenAction implements Action {
  type = AuthActionTypes.ADD_TOKEN;
  constructor(public payload: string) { }
}

export class RemoveTokenAction implements Action {
  type = AuthActionTypes.REMOVE_TOKEN;
  constructor(public payload: string) { }
}

export type AuthActions = AddTokenAction | RemoveTokenAction;
