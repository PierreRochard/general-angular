import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  SUBMIT_FORM:         type('SUBMIT_FORM'),
  RECEIVE_POST:        type('RECEIVE_POST'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVED_SCHEMA:     type('RECEIVED_SCHEMA'),
};

export class SubmitFormAction implements Action {
  type = ActionTypes.SUBMIT_FORM;
  constructor(public payload) {}
}
export class ReceivePostAction implements Action {
  type = ActionTypes.RECEIVE_POST;
  constructor(public payload) {}
}
export class RequestSchemaAction implements Action {
  type = ActionTypes.REQUEST_SCHEMA;
}
export class ReceivedSchemaAction implements Action {
  type = ActionTypes.RECEIVED_SCHEMA;
  constructor(public payload) {}
}

export type Actions
  = SubmitFormAction
  | ReceivePostAction
  | RequestSchemaAction
  | ReceivedSchemaAction;
