import { createAction, props } from '@ngrx/store';

import { RouteParams } from '../router/router.models';

import {
  Datatable, DatatableColumn, UpdateRecord,
  SuggestionsQuery, DeleteRecord, DatatableUpdate,
} from './table.models';

export const addRecord = createAction('[Table] Add Record', props<{ record: any }>());
export const setRecordsLoading = createAction('[Table] Are Records Loading', props<{ isLoading: boolean }>());
export const deleteRecord = createAction('[Table] Delete Record', props<{ delete: DeleteRecord }>());
export const deselectRecord = createAction('[Table] Deselect Record', props<{ record: any }>());
export const deselectRecords = createAction('[Table] Deselect Records');
export const editCancel = createAction('[Table] Edit Cancel', props<{ payload: any }>());
export const getDatatable = createAction('[Table] Get Datatable', props<{ params: RouteParams }>());
export const getDatatableColumns = createAction('[Table] Get Datatable Columns', props<{ params: RouteParams }>());
export const getRecords = createAction('[Table] Get Records', props<{ datatable: Datatable }>());
export const getSuggestions = createAction('[Table] Get Select Items', props<{ query: SuggestionsQuery }>());
export const initializeSettings = createAction('[Table] Initialize Settings', props<{ payload: any }>());
export const receiveDatatable = createAction('[Table] Receive Datatable', props<{ datatable: Datatable }>());
export const receiveDatatableColumns = createAction('[Table] Receive Datatable Columns', props<{ columns: DatatableColumn[] }>());
export const receiveRecords = createAction('[Table] Receive Records', props<{ records: any[] }>());
export const receiveSuggestions = createAction('[Table] Receive Select Items', props<{ suggestions: any[] }>());
export const removeRecord = createAction('[Table] Remove Record', props<{ record: any }>());
export const removeTableRecords = createAction('[Table] Remove Records', props<{ tableName: string }>());
export const selectRecords = createAction('[Table] Select Records', props<{ records: any[] }>());
export const selectTable = createAction('[Table] Select Table', props<{ params: RouteParams }>());
export const updateColumnsVisibility = createAction('[Table] Update Columns Visibility', props<{ columns: DatatableColumn[]; isVisible: boolean }>());
export const updateKeyword = createAction('[Table] Update Keyword', props<{ column: DatatableColumn; value: string }>());
export const updatePagination = createAction('[Table] Update Pagination', props<{ update: DatatableUpdate }>());
export const updateRecord = createAction('[Table] Update Record', props<{ update: UpdateRecord }>());
export const updateRowCount = createAction('[Table] Update Row Count', props<{ rowCount: number }>());
export const updateSort = createAction('[Table] Update Sort', props<{ update: DatatableUpdate }>());
export const updateTableName = createAction('[Table] Update Table Name', props<{ params: RouteParams }>());
