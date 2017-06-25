import {TableActions, TableActionTypes} from './table.actions';
import {TableColumnSetting} from './table.models';


export interface TableState {
  tableName: string,
  isLoading: boolean,
  records: any[];
  tableRecordsAreLoading: boolean;
  selectedRecords: any[];
  tableColumns: TableColumnSetting[];
  rowCount: number;
  rowLimit: number;
}

const initialState: TableState = {
  tableName: null,
  isLoading: false,
  records: null,
  tableRecordsAreLoading: null,
  selectedRecords: null,
  tableColumns: [],
  rowCount: null,
  rowLimit: null
};

export function tableReducer(state = initialState, action: TableActions): TableState {
  switch (action.type) {
    case TableActionTypes.ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.payload, ...state.records]
      });
    case TableActionTypes.REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.SELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: action.payload
      });
    case TableActionTypes.DESELECT_RECORD:
      return Object.assign({}, state, {
        selectedRecords: state.selectedRecords.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.DESELECT_RECORDS:
      return Object.assign({}, state, {
        selectedRecords: []
      });
    case TableActionTypes.RECEIVE_DATATABLE_COLUMNS:
      return Object.assign({}, state, {
        tableColumnSettings: action.payload
      });
    case TableActionTypes.RECEIVE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload
      });
    case TableActionTypes.REMOVE_RECORDS:
      return Object.assign({}, state, {
        records: null
      });
    case TableActionTypes.UPDATE_TABLE_NAME_ACTION:
      return Object.assign({}, state, {
        tableName: action.payload
      });
    case TableActionTypes.ARE_RECORDS_LOADING:
      return Object.assign({}, state, {
        tableRecordsAreLoading: action.payload
      });
    case TableActionTypes.RECEIVE_DATATABLE:
      return Object.assign({}, state, {
        rowLimit: action.payload.row_limit
      });
    case TableActionTypes.UPDATE_ROW_COUNT:
      return Object.assign({}, state, {
        rowCount: action.payload
      });
    default:
      return state;
  }
}

