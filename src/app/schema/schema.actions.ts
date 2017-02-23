import { Action } from '@ngrx/store';

import { type } from '../util';


export const ActionTypes = {
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVE_SCHEMA:      type('RECEIVE_SCHEMA'),
  SELECT_PATH_NAME:         type('SELECT_PATH_NAME'),
  SUBMIT_FORM:         type('SUBMIT_FORM'),
  RECEIVE_POST:        type('RECEIVE_POST'),
};


export class InvalidateAction implements Action {
  type = ActionTypes.INVALIDATE_SCHEMA;

  constructor() { }
}

export class RequestAction implements Action {
  type = ActionTypes.REQUEST_SCHEMA;

  constructor() { }
}

export class ReceiveAction implements Action {
  type = ActionTypes.RECEIVE_SCHEMA;

  constructor(public payload) {
  }
}

export class SelectPathNameAction implements Action {
  type = ActionTypes.SELECT_PATH_NAME;

  constructor(public payload: string) { }
}

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
  = SelectPathNameAction
  | InvalidateAction
  | RequestAction
  | ReceiveAction
  | ReceivePostAction;
