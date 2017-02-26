import { Action } from '@ngrx/store';

import { type } from '../util';


export const ActionTypes = {
  RPC_SUBMIT_FORM:         type('RPC_SUBMIT_FORM'),
  RPC_RECEIVE_POST:        type('RPC_RECEIVE_POST'),
};


export class SubmitFormAction implements Action {
  type = ActionTypes.RPC_SUBMIT_FORM;

  constructor(public payload) {
  }
}

export class ReceivePostAction implements Action {
  type = ActionTypes.RPC_RECEIVE_POST;

  constructor(public payload) {
  }
}

export type Actions
  = SubmitFormAction
  | ReceivePostAction;
