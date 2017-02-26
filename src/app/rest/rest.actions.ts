import { Action } from '@ngrx/store';

import { type } from '../util';


export const ActionTypes = {
  SUBMIT_FORM:         type('SUBMIT_FORM'),
  RECEIVE_POST:        type('RECEIVE_POST'),
};


export class SubmitFormAction implements Action {
  type = ActionTypes.SUBMIT_FORM;

  constructor(public payload) {
  }
}

export class ReceivePostAction implements Action {
  type = ActionTypes.RECEIVE_POST;

  constructor(public payload) {
  }
}

export type Actions
  = SubmitFormAction
  | ReceivePostAction;
