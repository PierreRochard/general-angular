import {Response} from "@angular/http";
import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  SEND_POST_REQUEST:   type('SEND_POST_REQUEST'),
  RECEIVED_RESPONSE:   type('RECEIVED_RESPONSE'),
  SEND_GET_REQUEST:    type('SEND_GET_REQUEST'),
  RECEIVED_SCHEMA:     type('RECEIVED_SCHEMA'),
};

export class SendPostRequestAction implements Action {
  type = ActionTypes.SEND_POST_REQUEST;
  constructor(public payload: any) {}
}
export class SendGetRequestAction implements Action {
  type = ActionTypes.SEND_GET_REQUEST;
}
export class ReceivedResponseAction implements Action {
  type = ActionTypes.RECEIVED_RESPONSE;
  constructor(public payload: Response) {}
}

export type Actions
  = SendPostRequestAction
  | ReceivedResponseAction
  | SendGetRequestAction;
