import { Action } from '@ngrx/store';

import { RouteParams } from '../router/router.models';

import {
  Datatable, DatatableColumn, RecordsUpdate,
  SuggestionsQuery,
} from './table.models';

export const ADD_RECORD = '[Table] Add Record';
export const ARE_RECORDS_LOADING = '[Table] Are Records Loading';
export const DESELECT_RECORD = '[Table] Deselect Record';
export const DESELECT_RECORDS = '[Table] Deselect Records';
export const EDIT_CANCEL = '[Table] Edit Cancel';
export const GET_DATATABLE = '[Table] Get Datatable';
export const GET_DATATABLE_COLUMNS = '[Table] Get Datatable Columns';
export const GET_RECORDS = '[Table] Get Records';
export const GET_SUGGESTIONS = '[Table] Get Select Items';
export const INITIALIZE_SETTINGS = '[Table] Initialize Settings';
export const RECEIVE_DATATABLE = '[Table] Receive Datatable';
export const RECEIVE_DATATABLE_COLUMNS = '[Table] Receive Datatable Columns';
export const RECEIVE_RECORDS = '[Table] Receive Records';
export const RECEIVE_SUGGESTIONS = '[Table] Receive Select Items';
export const REMOVE_RECORD = '[Table] Remove Record';
export const REMOVE_RECORDS = '[Table] Remove Records';
export const SELECT_RECORDS = '[Table] Select Records';
export const SELECT_TABLE = '[Table] Select Table';
export const UPDATE_COLUMNS_VISIBILITY = '[Table] Update Columns Visibility';
export const UPDATE_PAGINATION = '[Table] Update Pagination';
export const UPDATE_RECORD = '[Table] Update Record';
export const UPDATE_ROW_COUNT = '[Table] Update Row Count';
export const UPDATE_SORT = '[Table] Update Sort';
export const UPDATE_TABLE_NAME = '[Table] Update Table Name';

export class AddRecordAction implements Action {
  type = ADD_RECORD;
  constructor(public payload: any) {}
}

export class AreRecordsLoadingAction implements Action {
  type = ARE_RECORDS_LOADING;
  constructor(public payload: any) {}
}

export class DeselectRecordAction implements Action {
  type = DESELECT_RECORD;
  constructor(public payload: any) {}
}

export class DeselectRecordsAction implements Action {
  type = DESELECT_RECORDS;
  constructor(public payload: any) {}
}

export class EditCancelAction implements Action {
  type = EDIT_CANCEL;
  constructor(public payload: any) {}
}

export class GetDatatableAction implements Action {
  type = GET_DATATABLE;
  constructor(public payload: RouteParams) { }
}

export class GetDatatableColumnsAction implements Action {
  type = GET_DATATABLE_COLUMNS;
  constructor(public payload: RouteParams) { }
}

export class GetRecordsAction implements Action {
  type = GET_RECORDS;
  constructor(public payload: Datatable) { }
}

export class GetSuggestions implements Action {
  type = GET_SUGGESTIONS;
  constructor(public payload: SuggestionsQuery) { }
}

export class InitializeSettingsAction implements Action {
  type = INITIALIZE_SETTINGS;
  constructor(public payload: any) {}
}

export class ReceiveDatatableAction implements Action {
  type = RECEIVE_DATATABLE;
  constructor(public payload: Datatable) {}
}

export class ReceiveDatatableColumnsAction implements Action {
  type = RECEIVE_DATATABLE_COLUMNS;
  constructor(public payload: DatatableColumn[]) {}
}

export class ReceiveRecordsAction implements Action {
  type = RECEIVE_RECORDS;
  constructor(public payload: any[]) {}
}

export class ReceiveSuggestionsAction implements Action {
  type = RECEIVE_SUGGESTIONS;
  constructor(public payload: any[]) {}
}

export class RemoveRecordAction implements Action {
  type = REMOVE_RECORD;
  constructor(public payload: any) {}
}

export class RemoveTableRecordsAction implements Action {
  type = REMOVE_RECORDS;
  constructor(public payload: string) { }
}

export class SelectRecordsAction implements Action {
  type = SELECT_RECORDS;
  constructor(public payload: any) {}
}

export class SelectTableAction implements Action {
  type = SELECT_TABLE;
  constructor(public payload: RouteParams) {}
}

export class UpdateColumnsVisibilityAction implements Action {
  type = UPDATE_COLUMNS_VISIBILITY;
  constructor(public payload: any) {}
}

export class UpdatePaginationAction implements Action {
  type = UPDATE_PAGINATION;
  constructor(public payload: any) {}
}

export class UpdateRecordAction implements Action {
  type = UPDATE_RECORD;
  constructor(public payload: RecordsUpdate) {}
}

export class UpdateRowCountAction implements Action {
  type = UPDATE_ROW_COUNT;
  constructor(public payload: number) {}
}

export class UpdateSortAction implements Action {
  type = UPDATE_SORT;
  constructor(public payload: any) {}
}

export class UpdateTableNameAction implements Action {
  type = UPDATE_TABLE_NAME;
  constructor(public payload: RouteParams) {}
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
  | UpdateRecordAction
  | UpdateRowCountAction
  | UpdateSortAction
  | UpdateTableNameAction;
