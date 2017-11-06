import {
  ADD_RECORD,
  ARE_RECORDS_LOADING,
  DESELECT_RECORDS,
  DESELECT_RECORD,
  GET_DATATABLE,
  GET_DATATABLE_COLUMNS,
  GET_SUGGESTIONS,
  RECEIVE_DATATABLE,
  RECEIVE_DATATABLE_COLUMNS,
  RECEIVE_RECORDS,
  REMOVE_RECORD,
  REMOVE_RECORDS,
  SELECT_RECORDS,
  TableActions,
  UPDATE_ROW_COUNT,
  UPDATE_TABLE_NAME, RECEIVE_SUGGESTIONS, UPDATE_KEYWORD,
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

const initialState: TableState = {
  areColumnsLoading: true,
  areRecordsLoading: true,
  columns: [],
  datatable: null,
  isDatatableLoading: true,
  records: [],
  rowCount: null,
  rowLimit: null,
  rowOffset: 0,
  schemaName: null,
  selectedRecords: [],
  suggestions: [],
  suggestionsColumn: null,
  sortColumn: null,
  sortOrder: 1,
  tableName: null,
};

export function tableReducer(state = initialState, action: TableActions): TableState {
  console.log(action);
  switch (action.type) {
    case ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.payload, ...state.records],
      });
    case ARE_RECORDS_LOADING:
      return Object.assign({}, state, {
        tableRecordsAreLoading: action.payload,
      });
    case DESELECT_RECORD:
      return Object.assign({}, state, {
        selectedRecords: state.selectedRecords.filter(record => record.id !== action.payload.id),
      });
    case DESELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: [],
      });
    case GET_DATATABLE:
      return Object.assign({}, state, {
        isDatatableLoading: true,
        datatable: null,
        records: [],
      });
    case GET_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        areColumnsLoading: true,
        records: [],
        columns: [],
      });
    case GET_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestionsColumn: action.payload.column,
      });
    case RECEIVE_DATATABLE:
      return Object.assign({}, state, {
        datatable: action.payload,
        isDatatableLoading: false,
        rowLimit: action.payload.row_limit,
        rowOffset: action.payload.row_offset,
        sortColumn: action.payload.sort_column,
        sortOrder: action.payload.sort_order,
      });
    case RECEIVE_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        areColumnsLoading: false,
        columns: action.payload,
      });
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload,
        areRecordsLoading: false,
      });
    case RECEIVE_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestions: action.payload,
      });
    case REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id),
      });
    case REMOVE_RECORDS:
      return Object.assign({}, state, {
        records: [],
      });
    case SELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: action.payload,
      });
    case UPDATE_KEYWORD:
      console.log(action.payload);
      return Object.assign({}, state, {
        datatable: Object.assign({}, state.datatable, {
          filter_columns: [action.payload.column],
        }),
      });
    case UPDATE_ROW_COUNT:
      return Object.assign({}, state, {
        rowCount: action.payload,
      });
    case UPDATE_TABLE_NAME:
      return Object.assign({}, state, {
        tableName: action.payload.selectedObjectName,
        schemaName: action.payload.selectedSchemaName,
      });
    default:
      return state;
  }
}

