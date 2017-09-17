import {Response} from '@angular/http';

import {Action} from '@ngrx/store';

import {type} from '../util';

export const RestActionTypes = {
  SEND_GET_REQUEST:    type('SEND_GET_REQUEST'),
  SEND_POST_REQUEST:   type('SEND_POST_REQUEST'),
  SEND_DELETE_REQUEST: type('SEND_DELETE_REQUEST'),
  RECEIVED_RESPONSE:   type('RECEIVED_RESPONSE'),
  RECEIVED_SCHEMA:     type('RECEIVED_SCHEMA'),
};

export class SendGetRequestAction implements Action {
  type = RestActionTypes.SEND_GET_REQUEST;
  constructor(public payload: any) {}
}
export class SendPostRequestAction implements Action {
  type = RestActionTypes.SEND_POST_REQUEST;
  constructor(public payload: any) {}
}
export class SendDeleteRequestAction implements Action {
  type = RestActionTypes.SEND_DELETE_REQUEST;
  constructor(public payload: any) {}
}
export class ReceivedResponseAction implements Action {
  type = RestActionTypes.RECEIVED_RESPONSE;
  constructor(public payload: Response) {}
}

export type RestActions
  = SendGetRequestAction
  | SendPostRequestAction
  | SendDeleteRequestAction
  | ReceivedResponseAction;
