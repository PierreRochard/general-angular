import {TableActions, TableActionTypes} from './table.actions';
import {TableColumnSetting} from './table.models';


export interface TableState {
  tableName: string,
  isLoading: boolean,
  records: any[];
  selectedRecords: any[];
  tableColumnSettings: TableColumnSetting[];
}

const initialState: TableState = {
  tableName: null,
  isLoading: false,
  records: null,
  selectedRecords: null,
  tableColumnSettings: [],
};

export function tableReducer(state = initialState, action: TableActions): TableState {
  switch (action.type) {
    case TableActionTypes.INITIALIZE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload
      });
    case TableActionTypes.ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.payload, ...state.records]
      });
    case TableActionTypes.REMOVE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    case TableActionTypes.INITIALIZE_SETTINGS:
      return Object.assign({}, state, {
        settings: action.payload
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
    case TableActionTypes.RECEIVE_TABLE_COLUMN_SETTINGS:
      return Object.assign({}, state, {
        tableColumnSettings: action.payload
      });
    case TableActionTypes.RECEIVE_TABLE_RECORDS:
      return Object.assign({}, state, {
        records: action.payload
      });
    case TableActionTypes.REMOVE_TABLE_RECORDS:
      return Object.assign({}, state, {
        records: null
      });
    case TableActionTypes.UPDATE_TABLE_NAME_ACTION:
      return Object.assign({}, state, {
        tableName: action.payload
      });
    default:
      return state;
  }
}

