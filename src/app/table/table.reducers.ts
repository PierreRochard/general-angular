import {TableActions, TableActionTypes} from './table.actions';


export interface TableState {
  records: any[];
  selectedRecords: any[];
  tableColumnSettings: any[];
}

const initialState: TableState = {
  records: null,
  selectedRecords: null,
  tableColumnSettings: null,
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
    default:
      return state;
  }
}

