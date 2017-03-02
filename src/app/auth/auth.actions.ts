import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  ADD_TOKEN:     type('ADD_TOKEN'),
  REMOVE_TOKEN:  type('REMOVE_TOKEN'),
  ADD_APIURL:    type('ADD_APIURL'),
  REMOVE_APIURL: type('REMOVE_APIURL'),
};

export class AddTokenAction implements Action {
  type = ActionTypes.ADD_TOKEN;
  constructor(public payload: string) { }
}

export class RemoveTokenAction implements Action {
  type = ActionTypes.REMOVE_TOKEN;
}

export class AddApiUrlAction implements Action {
  type = ActionTypes.ADD_APIURL;
  constructor(public payload: string) { }
}

export class RemoveApiUrlAction implements Action {
  type = ActionTypes.REMOVE_APIURL;
}

export type Actions
  = AddTokenAction
  | RemoveTokenAction
  | AddApiUrlAction
  | RemoveApiUrlAction;
