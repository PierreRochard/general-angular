import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  SELECT_ENDPOINT: type('SELECT_ENDPOINT'),
  ADD_ENDPOINTS:    type('ADD_ENDPOINTS'),
  ADD_PROPERTIES:    type('ADD_PROPERTIES'),
  INITIALIZE_ENDPOINTS: type('INITIALIZE_ENDPOINTS'),
  SUBMIT_FORM: type('SUBMIT_FORM'),
  RECEIVE_POST: type('RECEIVE_POST'),
};

export class SelectAction implements Action {
  type = ActionTypes.SELECT_ENDPOINT;

  constructor(public payload) { }
}

export class AddEndpointsAction implements Action {
  type = ActionTypes.ADD_ENDPOINTS;

  constructor(public payload) { }
}

export class AddPropertiesAction implements Action {
  type = ActionTypes.ADD_PROPERTIES;

  constructor(public payload) { }
}

export class InitializeAction implements Action {
  type = ActionTypes.INITIALIZE_ENDPOINTS;

  constructor() { }
}

export class SubmitFormAction implements Action {
  type = ActionTypes.SUBMIT_FORM;

  constructor(public payload) { }
}

export class ReceivePostAction implements Action {
  type = ActionTypes.RECEIVE_POST;

  constructor(public payload) { }
}

export type Actions
  = SelectAction
  | AddEndpointsAction
  | AddPropertiesAction
  | InitializeAction
  | SubmitFormAction;
