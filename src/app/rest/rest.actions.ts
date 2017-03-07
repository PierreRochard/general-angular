import {Response} from "@angular/http";
import { Action } from '@ngrx/store';

import { type } from '../util';

import {PostActionPayload} from "./rest.models";

export const ActionTypes = {
  SEND_GET_REQUEST:    type('SEND_GET_REQUEST'),
  SEND_POST_REQUEST:   type('SEND_POST_REQUEST'),
  SEND_DELETE_REQUEST: type('SEND_DELETE_REQUEST'),
  RECEIVED_RESPONSE:   type('RECEIVED_RESPONSE'),
  RECEIVED_SCHEMA:     type('RECEIVED_SCHEMA'),
};

export class SendGetRequestAction implements Action {
  type = ActionTypes.SEND_GET_REQUEST;
  constructor(public payload: string) {}
}
export class SendPostRequestAction implements Action {
  type = ActionTypes.SEND_POST_REQUEST;
  constructor(public payload: PostActionPayload) {}
}
export class SendDeleteRequestAction implements Action {
  type = ActionTypes.SEND_DELETE_REQUEST;
  constructor(public payload: string) {}
}
export class ReceivedResponseAction implements Action {
  type = ActionTypes.RECEIVED_RESPONSE;
  constructor(public payload: Response) {}
}

export type Actions
  = SendGetRequestAction
  | SendPostRequestAction
  | SendDeleteRequestAction
  | ReceivedResponseAction;
