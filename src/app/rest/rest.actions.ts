import {Response} from "@angular/http";
import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  SUBMIT_FORM:         type('SUBMIT_FORM'),
  RECEIVED_POST_RESPONSE:        type('RECEIVED_POST_RESPONSE'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVED_SCHEMA:     type('RECEIVED_SCHEMA'),
};

export class SubmitFormAction implements Action {
  type = ActionTypes.SUBMIT_FORM;
  constructor(public payload: any) {}
}
export class ReceivedPostResponseAction implements Action {
  type = ActionTypes.RECEIVED_POST_RESPONSE;
  constructor(public payload: Response) {}
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
  | ReceivedPostResponseAction
  | RequestSchemaAction
  | ReceivedSchemaAction;
