import { Action } from '@ngrx/store';

import { type } from '../util';

import { ColumnsVisibilityUpdate, Datatable, DatatableColumns } from './table.models';
import { LazyLoadEvent } from 'primeng/primeng';

export const TableActionTypes = {
  ADD_RECORD: type('ADD_RECORD'),
  ARE_RECORDS_LOADING: type('ARE_RECORDS_LOADING'),
  DESELECT_RECORD: type('DESELECT_RECORD'),
  DESELECT_RECORDS: type('DESELECT_RECORDS'),
  GET_DATATABLE: type('GET_DATATABLE'),
  GET_DATATABLE_COLUMNS: type('GET_DATATABLE_COLUMNS'),
  GET_RECORDS: type('GET_RECORDS'),
  INITIALIZE_SETTINGS: type('INITIALIZE_SETTINGS'),
  RECEIVE_DATATABLE_COLUMNS: type('RECEIVE_DATATABLE_COLUMNS'),
  RECEIVE_DATATABLE: type('RECEIVE_DATATABLE'),
  RECEIVE_RECORDS: type('RECEIVE_RECORDS'),
  REMOVE_RECORD: type('REMOVE_RECORD'),
  REMOVE_RECORDS: type('REMOVE_RECORDS'),
  SELECT_RECORDS: type('SELECT_RECORDS'),
  UPDATE_COLUMNS_VISIBILITY: type('UPDATE_COLUMNS_VISIBILITY'),
  UPDATE_PAGINATION: type('UPDATE_PAGINATION'),
  UPDATE_ROW_COUNT: type('UPDATE_ROW_COUNT'),
  UPDATE_SORT: type('UPDATE_SORT'),
  UPDATE_TABLE_NAME_ACTION: type('UPDATE_TABLE_NAME_ACTION'),
};

export class AddRecordAction implements Action {
  type = TableActionTypes.ADD_RECORD;
  constructor(public payload: any) {}
}

export class AreRecordsLoadingAction implements Action {
  type = TableActionTypes.ARE_RECORDS_LOADING;
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

export class GetDatatableAction implements Action {
  type = TableActionTypes.GET_DATATABLE;
  constructor(public payload: string) { }
}

export class GetDatatableColumnsAction implements Action {
  type = TableActionTypes.GET_DATATABLE_COLUMNS;
  constructor(public payload: string) { }
}

export class GetRecordsAction implements Action {
  type = TableActionTypes.GET_RECORDS;
  constructor(public payload: Datatable) { }
}

export class InitializeSettingsAction implements Action {
  type = TableActionTypes.INITIALIZE_SETTINGS;
  constructor(public payload: any) {}
}

export class ReceiveDatatableAction implements Action {
  type = TableActionTypes.RECEIVE_DATATABLE;
  constructor(public payload: Datatable) {}
}

export class ReceiveDatatableColumnsAction implements Action {
  type = TableActionTypes.RECEIVE_DATATABLE_COLUMNS;
  constructor(public payload: DatatableColumns[]) {}
}

export class ReceiveRecordsAction implements Action {
  type = TableActionTypes.RECEIVE_RECORDS;
  constructor(public payload: any[]) {}
}

export class RemoveRecordAction implements Action {
  type = TableActionTypes.REMOVE_RECORD;
  constructor(public payload: any) {}
}

export class RemoveTableRecordsAction implements Action {
  type = TableActionTypes.REMOVE_RECORDS;
  constructor(public payload: string) { }
}

export class SelectRecordsAction implements Action {
  type = TableActionTypes.SELECT_RECORDS;
  constructor(public payload: any) {}
}

export class UpdateColumnsVisibilityAction implements Action {
  type = TableActionTypes.UPDATE_COLUMNS_VISIBILITY;
  constructor(public payload: ColumnsVisibilityUpdate) {}
}

export class UpdatePaginationAction implements Action {
  type = TableActionTypes.UPDATE_PAGINATION;
  constructor(public payload: LazyLoadEvent) {}
}

export class UpdateRowCountAction implements Action {
  type = TableActionTypes.UPDATE_ROW_COUNT;
  constructor(public payload: number) {}
}

export class UpdateSortAction implements Action {
  type = TableActionTypes.UPDATE_SORT;
  constructor(public payload: LazyLoadEvent) {}
}

export class UpdateTableNameAction implements Action {
  type = TableActionTypes.UPDATE_TABLE_NAME_ACTION;
  constructor(public payload: string) {}
}


export type TableActions
  = AddRecordAction
  | AreRecordsLoadingAction
  | DeselectRecordAction
  | DeselectRecordsAction
  | GetDatatableColumnsAction
  | GetRecordsAction
  | InitializeSettingsAction
  | ReceiveDatatableColumnsAction
  | ReceiveRecordsAction
  | RemoveRecordAction
  | RemoveTableRecordsAction
  | SelectRecordsAction
  | UpdateColumnsVisibilityAction
  | UpdatePaginationAction
  | UpdateRowCountAction
  | UpdateSortAction
  | UpdateTableNameAction;
