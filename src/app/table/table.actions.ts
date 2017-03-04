import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  INITIALIZE_RECORDS:   type('INITIALIZE_RECORDS'),
  ADD_RECORD:           type('ADD_RECORD'),
};

export class InitializeRecordsAction implements Action {
  type = ActionTypes.INITIALIZE_RECORDS;
  constructor(public payload) {}
}

export class AddRecordAction implements Action {
  type = ActionTypes.ADD_RECORD;
  constructor(public payload) {}
}


export type Actions
  = InitializeRecordsAction
  | AddRecordAction;
