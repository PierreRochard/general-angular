import { Action } from '@ngrx/store';

import { type } from '../util';
import {TableColumnSetting} from "./table.models";

export const TableActionTypes = {
  INITIALIZE_RECORDS: type('INITIALIZE_RECORDS'),
  ADD_RECORD: type('ADD_RECORD'),
  REMOVE_RECORD: type('REMOVE_RECORD'),
  INITIALIZE_SETTINGS: type('INITIALIZE_SETTINGS'),
  SELECT_RECORDS: type('SELECT_RECORDS'),
  DESELECT_RECORD: type('DESELECT_RECORD'),
  DESELECT_RECORDS: type('DESELECT_RECORDS'),
  GET_TABLE_COLUMN_SETTINGS: type('GET_TABLE_COLUMN_SETTINGS'),
  RECEIVE_TABLE_COLUMN_SETTINGS: type('RECEIVE_TABLE_COLUMN_SETTINGS'),
};

export class InitializeRecordsAction implements Action {
  type = TableActionTypes.INITIALIZE_RECORDS;
  constructor(public payload: any) {}
}

export class AddRecordAction implements Action {
  type = TableActionTypes.ADD_RECORD;
  constructor(public payload: any) {}
}

export class RemoveRecordAction implements Action {
  type = TableActionTypes.REMOVE_RECORD;
  constructor(public payload: any) {}
}

export class InitializeSettingsAction implements Action {
  type = TableActionTypes.INITIALIZE_SETTINGS;
  constructor(public payload: any) {}
}

export class SelectRecordsAction implements Action {
  type = TableActionTypes.SELECT_RECORDS;
  constructor(public payload: any) {}
}

export class DeselectRecordAction implements Action {
  type = TableActionTypes.DESELECT_RECORD;
  constructor(public payload: any) {}
}

export class DeselectRecordsAction implements Action {
  type = TableActionTypes.DESELECT_RECORDS;
  constructor(public payload: any) {}
}

export class GetTableColumnSettingsAction implements Action {
  type = TableActionTypes.GET_TABLE_COLUMN_SETTINGS;
  constructor(public payload: string) { }
}

export class ReceiveTableColumnSettingsAction implements Action {
  type = TableActionTypes.RECEIVE_TABLE_COLUMN_SETTINGS;
  constructor(public payload: TableColumnSetting[]) {}
}



export type TableActions
  = InitializeRecordsAction
  | AddRecordAction
  | RemoveRecordAction
  | InitializeSettingsAction
  | SelectRecordsAction
  | DeselectRecordAction
  | DeselectRecordsAction
  | GetTableColumnSettingsAction
  | ReceiveTableColumnSettingsAction;
