import { Action } from '@ngrx/store';

import { type } from '../util';
import {TableColumnSetting} from './table.models';

export const TableActionTypes = {
  ADD_RECORD: type('ADD_RECORD'),
  REMOVE_RECORD: type('REMOVE_RECORD'),
  INITIALIZE_SETTINGS: type('INITIALIZE_SETTINGS'),
  SELECT_RECORDS: type('SELECT_RECORDS'),
  DESELECT_RECORD: type('DESELECT_RECORD'),
  DESELECT_RECORDS: type('DESELECT_RECORDS'),
  GET_DATATABLE_COLUMNS: type('GET_DATATABLE_COLUMNS'),
  GET_TABLE_RECORDS: type('GET_TABLE_RECORDS'),
  REMOVE_TABLE_RECORDS: type('REMOVE_TABLE_RECORDS'),
  RECEIVE_DATATABLE_COLUMNS: type('RECEIVE_DATATABLE_COLUMNS'),
  RECEIVE_TABLE_RECORDS: type('RECEIVE_TABLE_RECORDS'),
  UPDATE_TABLE_NAME_ACTION: type('UPDATE_TABLE_NAME_ACTION'),
  TABLE_RECORDS_ARE_LOADING: type('TABLE_RECORDS_ARE_LOADING'),
  RECEIVE_TABLE_SETTINGS: type('RECEIVE_TABLE_SETTINGS'),
  UPDATE_ROW_COUNT: type('UPDATE_ROW_COUNT'),
};

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

export class GetTableRecordsAction implements Action {
  type = TableActionTypes.GET_TABLE_RECORDS;
  constructor(public payload: string) { }
}

export class RemoveTableRecordsAction implements Action {
  type = TableActionTypes.REMOVE_TABLE_RECORDS;
  constructor(public payload: string) { }
}

export class ReceiveTableRecordsAction implements Action {
  type = TableActionTypes.RECEIVE_TABLE_RECORDS;
  constructor(public payload: any[]) {}
}

export class GetTableColumnSettingsAction implements Action {
  type = TableActionTypes.GET_DATATABLE_COLUMNS;
  constructor(public payload: string) { }
}

export class ReceiveDatatableColumnsAction implements Action {
  type = TableActionTypes.RECEIVE_DATATABLE_COLUMNS;
  constructor(public payload: TableColumnSetting[]) {}
}

export class UpdateTableNameAction implements Action {
  type = TableActionTypes.UPDATE_TABLE_NAME_ACTION;
  constructor(public payload: string) {}
}

export class TableRecordsAreLoadingAction implements Action {
  type = TableActionTypes.TABLE_RECORDS_ARE_LOADING;
  constructor(public payload: any) {}
}

export class UpdateRowCountAction implements Action {
  type = TableActionTypes.UPDATE_ROW_COUNT;
  constructor(public payload: number) {}
}


export type TableActions
  = AddRecordAction
  | RemoveRecordAction
  | InitializeSettingsAction
  | SelectRecordsAction
  | DeselectRecordAction
  | DeselectRecordsAction
  | GetTableColumnSettingsAction
  | GetTableRecordsAction
  | ReceiveTableRecordsAction
  | RemoveTableRecordsAction
  | ReceiveDatatableColumnsAction
  | UpdateTableNameAction
  | TableRecordsAreLoadingAction
  | UpdateRowCountAction;
