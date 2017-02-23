import { Action } from '@ngrx/store';

import { type } from '../util';


export const ActionTypes = {
  SELECT_SCHEMA:       type('SELECT_SCHEMA'),
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  REQUEST_SCHEMA:      type('REQUEST_SCHEMA'),
  RECEIVE_SCHEMA:      type('RECEIVE_SCHEMA'),
  SUBMIT_FORM:         type('SUBMIT_FORM'),
  RECEIVE_POST:        type('RECEIVE_POST'),
};


export class SelectAction implements Action {
  type = ActionTypes.SELECT_SCHEMA;

  constructor(public payload) { }
}

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

export class ReceivePostAction implements Action {
  type = ActionTypes.RECEIVE_POST;

  constructor(public payload) {
  }
}

export class SubmitFormAction implements Action {
  type = ActionTypes.SUBMIT_FORM;

  constructor(public payload) {
  }
}

export type Actions
  = SelectAction
  | InvalidateAction
  | RequestAction
  | ReceiveAction
  | ReceivePostAction;
