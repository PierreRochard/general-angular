import {TableActions, TableActionTypes} from './table.actions';
import { Datatable, DatatableColumn } from './table.models';


export interface TableState {
  areRecordsLoading: boolean;
  columns: DatatableColumn[];
  datatable: Datatable | null;
  records: any[];
  rowCount: number | null;
  rowLimit: number | null;
  rowOffset: number | null;
  schemaName: string | null;
  selectedRecords: any[];
  sortColumn: string | null;
  sortOrder: number | null;
  tableName: string | null;
}

const initialState: TableState = {
  areRecordsLoading: true,
  columns: [],
  datatable: null,
  records: [],
  rowCount: null,
  rowLimit: null,
  rowOffset: 0,
  schemaName: null,
  selectedRecords: [],
  sortColumn: null,
  sortOrder: 1,
  tableName: null
};

export function tableReducer(state = initialState, action: TableActions): TableState {
  switch (action.type) {
    case TableActionTypes.ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.payload, ...state.records]
      });
    case TableActionTypes.ARE_RECORDS_LOADING:
      return Object.assign({}, state, {
        tableRecordsAreLoading: action.payload
      });
    case TableActionTypes.DESELECT_RECORD:
      return Object.assign({}, state, {
        selectedRecords: state.selectedRecords.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.DESELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: []
      });
    case TableActionTypes.GET_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        records: []
      });
    case TableActionTypes.RECEIVE_DATATABLE:
      return Object.assign({}, state, {
        datatable: action.payload,
        rowLimit: action.payload.row_limit,
        rowOffset: action.payload.row_offset,
        sortColumn: action.payload.sort_column,
        sortOrder: action.payload.sort_order,
      });
    case TableActionTypes.RECEIVE_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        columns: action.payload
      });
    case TableActionTypes.RECEIVE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload,
        areRecordsLoading: false
      });
    case TableActionTypes.REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.REMOVE_RECORDS:
      return Object.assign({}, state, {
        records: []
      });
    case TableActionTypes.SELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: action.payload
      });
    case TableActionTypes.UPDATE_ROW_COUNT:
      return Object.assign({}, state, {
        rowCount: action.payload
      });
    case TableActionTypes.UPDATE_TABLE_NAME_ACTION:
      return Object.assign({}, state, {
        tableName: action.payload.selectedObjectName,
        schemaName: action.payload.selectedSchemaName
      });
    default:
      return state;
  }
}

