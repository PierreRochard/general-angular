import { createReducer, on } from '@ngrx/store';
import {
  addRecord,
  deselectRecord,
  deselectRecords,
  getDatatable,
  getDatatableColumns,
  getSuggestions,
  receiveDatatable,
  receiveDatatableColumns,
  receiveRecords,
  receiveSuggestions,
  removeRecord,
  removeTableRecords,
  selectRecords,
  setRecordsLoading,
  updateKeyword,
  updateRowCount,
  updateTableName,
} from './table.actions';
import { Datatable, DatatableColumn } from './table.models';


export interface TableState {
  areColumnsLoading: boolean;
  areRecordsLoading: boolean;
  columns: DatatableColumn[];
  datatable: Datatable | null;
  isDatatableLoading: boolean;
  records: any[];
  rowCount: number | null;
  rowLimit: number | null;
  rowOffset: number | null;
  schemaName: string | null;
  selectedRecords: any[];
  suggestions: string[];
  suggestionsColumn: DatatableColumn | null;
  sortColumn: string | null;
  sortOrder: number | null;
  tableName: string | null;
}

export const initialState: TableState = {
  areColumnsLoading: true,
  areRecordsLoading: true,
  columns: [] as DatatableColumn[],
  datatable: null as Datatable | null,
  isDatatableLoading: true,
  records: [] as any[],
  rowCount: null,
  rowLimit: null,
  rowOffset: 0,
  schemaName: null,
  selectedRecords: [] as any[],
  suggestions: [],
  suggestionsColumn: null,
  sortColumn: null,
  sortOrder: 1,
  tableName: null,
};

export const tableReducer = createReducer<TableState>(
  initialState,
  on(addRecord, (state, { record }) => ({ ...state, records: [record, ...state.records] })),
  on(setRecordsLoading, (state, { isLoading }) => ({ ...state, areRecordsLoading: isLoading })),
  on(deselectRecord, (state, { record }) => ({
    ...state,
    selectedRecords: state.selectedRecords.filter(r => r.id !== record.id),
  })),
  on(deselectRecords, state => ({ ...state, selectedRecords: [] as any[] })),
  on(getDatatable, state => ({
    ...state,
    isDatatableLoading: true,
    datatable: null as Datatable | null,
    records: [] as any[],
  })),
  on(getDatatableColumns, state => ({
    ...state,
    areColumnsLoading: true,
    records: [] as any[],
    columns: [] as DatatableColumn[],
  })),
  on(getSuggestions, (state, { query }) => ({
    ...state,
    suggestionsColumn: query.column,
  })),
  on(receiveDatatable, (state, { datatable }) => ({
    ...state,
    datatable,
    isDatatableLoading: false,
    rowLimit: datatable.row_limit,
    rowOffset: datatable.row_offset,
    sortColumn: datatable.sort_column,
    sortOrder: datatable.sort_order,
  })),
  on(receiveDatatableColumns, (state, { columns }) => ({
    ...state,
    areColumnsLoading: false,
    columns,
  })),
  on(receiveRecords, (state, { records }) => ({
    ...state,
    records,
    areRecordsLoading: false,
  })),
  on(receiveSuggestions, (state, { suggestions }) => ({
    ...state,
    suggestions,
  })),
  on(removeRecord, (state, { record }) => ({
    ...state,
    records: state.records.filter(r => r.id !== record.id),
  })),
  on(removeTableRecords, state => ({ ...state, records: [] as any[] })),
  on(selectRecords, (state, { records }) => ({ ...state, selectedRecords: records })),
  on(updateKeyword, (state, { column }) => ({
    ...state,
    datatable: state.datatable ? { ...state.datatable, filter_columns: [column] } : null,
  })),
  on(updateRowCount, (state, { rowCount }) => ({ ...state, rowCount })),
  on(updateTableName, (state, { params }) => ({
    ...state,
    tableName: params.selectedObjectName,
    schemaName: params.selectedSchemaName,
  })),
);
