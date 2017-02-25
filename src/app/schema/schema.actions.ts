import { Action } from '@ngrx/store';

import { type } from '../util';


export const ActionTypes = {
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVE_SCHEMA:      type('RECEIVE_SCHEMA'),
};


export class InvalidateAction implements Action {
  type = ActionTypes.INVALIDATE_SCHEMA;

  constructor() { }
}

export class RequestSchemaAction implements Action {
  type = ActionTypes.REQUEST_SCHEMA;

  constructor() { }
}

export class ReceiveSchemaAction implements Action {
  type = ActionTypes.RECEIVE_SCHEMA;

  constructor(public payload) {
  }
}

export type Actions
  = InvalidateAction
  | RequestSchemaAction
  | ReceiveSchemaAction;
