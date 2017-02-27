import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  ADD_TOKEN:    type('ADD_TOKEN'),
  REMOVE_TOKEN: type('REMOVE_TOKEN'),
};

export class AddTokenAction implements Action {
  type = ActionTypes.ADD_TOKEN;
  constructor(public payload) { }
}

export class RemoveTokenAction implements Action {
  type = ActionTypes.REMOVE_TOKEN;
}

export type Actions
  = AddTokenAction
  | RemoveTokenAction;
