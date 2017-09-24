import {
  ADD_RECORD,
  ARE_RECORDS_LOADING,
  DESELECT_RECORDS,
  DESELECT_RECORD,
  GET_DATATABLE_COLUMNS,
  RECEIVE_DATATABLE,
  RECEIVE_DATATABLE_COLUMNS,
  RECEIVE_RECORDS,
  REMOVE_RECORD,
  REMOVE_RECORDS,
  SELECT_RECORDS,
  TableActions,
  UPDATE_ROW_COUNT,
  UPDATE_TABLE_NAME
} from './table.actions';
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
    case ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.payload, ...state.records]
      });
    case ARE_RECORDS_LOADING:
      return Object.assign({}, state, {
        tableRecordsAreLoading: action.payload
      });
    case DESELECT_RECORD:
      return Object.assign({}, state, {
        selectedRecords: state.selectedRecords.filter(record => record.id !== action.payload.id)
      });
    case DESELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: []
      });
    case GET_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        records: []
      });
    case RECEIVE_DATATABLE:
      return Object.assign({}, state, {
        datatable: action.payload,
        rowLimit: action.payload.row_limit,
        rowOffset: action.payload.row_offset,
        sortColumn: action.payload.sort_column,
        sortOrder: action.payload.sort_order,
      });
    case RECEIVE_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        columns: action.payload
      });
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload,
        areRecordsLoading: false
      });
    case REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    case REMOVE_RECORDS:
      return Object.assign({}, state, {
        records: []
      });
    case SELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: action.payload
      });
    case UPDATE_ROW_COUNT:
      return Object.assign({}, state, {
        rowCount: action.payload
      });
    case UPDATE_TABLE_NAME:
      return Object.assign({}, state, {
        tableName: action.payload.selectedObjectName,
        schemaName: action.payload.selectedSchemaName
      });
    default:
      return state;
  }
}

