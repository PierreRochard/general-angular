import { Action } from '@ngrx/store';
import { type } from '../util';


export const ActionTypes = {
  SELECT_SCHEMA:       type('SELECT_SCHEMA'),
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVE_SCHEMA:      type('RECEIVE_SCHEMA'),
};


export class SelectAction implements Action {
  type = ActionTypes.SELECT_SCHEMA;

  constructor(public payload) { }
}

export class InvalidateAction implements Action {
  type = ActionTypes.INVALIDATE_SCHEMA;

  constructor(public payload) { }
}

export class RequestAction implements Action {
  type = ActionTypes.REQUEST_SCHEMA;

  constructor(public payload) { }
}

export class ReceiveAction implements Action {
  type = ActionTypes.RECEIVE_SCHEMA;

  constructor(public payload) { }
}


export type Actions
  = SelectAction
  | InvalidateAction
  | RequestAction
  | ReceiveAction;
