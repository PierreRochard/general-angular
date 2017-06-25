import {TableActions, TableActionTypes} from './table.actions';
import {DatatableColumns} from './table.models';


export interface TableState {
  areRecordsLoading: boolean;
  records: any[];
  rowCount: number;
  rowLimit: number;
  selectedRecords: any[];
  tableColumns: DatatableColumns[];
  tableName: string,
}

const initialState: TableState = {
  areRecordsLoading: null,
  records: null,
  rowCount: null,
  rowLimit: null,
  selectedRecords: null,
  tableColumns: [],
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
    case TableActionTypes.RECEIVE_DATATABLE:
      return Object.assign({}, state, {
        rowLimit: action.payload.row_limit
      });
    case TableActionTypes.RECEIVE_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        tableColumnSettings: action.payload
      });
    case TableActionTypes.RECEIVE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload
      });
    case TableActionTypes.REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.REMOVE_RECORDS:
      return Object.assign({}, state, {
        records: null
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
        tableName: action.payload
      });
    default:
      return state;
  }
}

