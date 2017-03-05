import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  INITIALIZE_RECORDS:   type('INITIALIZE_RECORDS'),
  ADD_RECORD:           type('ADD_RECORD'),
  REMOVE_RECORD:        type('REMOVE_RECORD'),
  SELECT_RECORDS:       type('SELECT_RECORDS'),
  DESELECT_RECORD:      type('DESELECT_RECORD'),
  DESELECT_RECORDS:      type('DESELECT_RECORDS'),
};

export class InitializeRecordsAction implements Action {
  type = ActionTypes.INITIALIZE_RECORDS;
  constructor(public payload) {}
}

export class AddRecordAction implements Action {
  type = ActionTypes.ADD_RECORD;
  constructor(public payload) {}
}

export class RemoveRecordAction implements Action {
  type = ActionTypes.REMOVE_RECORD;
  constructor(public payload) {}
}

export class SelectRecordsAction implements Action {
  type = ActionTypes.SELECT_RECORDS;
  constructor(public payload) {}
}

export class DeselectRecordAction implements Action {
  type = ActionTypes.DESELECT_RECORD;
  constructor(public payload) {}
}

export class DeselectRecordsAction implements Action {
  type = ActionTypes.DESELECT_RECORDS;
  constructor(public payload) {}
}



export type Actions
  = InitializeRecordsAction
  | AddRecordAction
  | RemoveRecordAction
  | SelectRecordsAction
  | DeselectRecordAction
  | DeselectRecordsAction;
