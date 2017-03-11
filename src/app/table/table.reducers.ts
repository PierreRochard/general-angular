import * as table from './table.actions';


export interface TableState {
  records: any[];
  selectedRecords: any[];
  settings: any[];
}

const initialState: TableState = {
  records: null,
  selectedRecords: null,
  settings: null,
};

export function reducer(state = initialState, action: table.Actions): TableState {
  switch (action.type) {
    case table.ActionTypes.INITIALIZE_RECORDS: {
      return Object.assign({}, state, {
        records: action.payload
      });
    }
    case table.ActionTypes.ADD_RECORD: {
      return Object.assign({}, state, {
        records: [action.payload, ...state.records]
      });
    }
    case table.ActionTypes.REMOVE_RECORD: {
      return Object.assign({}, state, {
        records: state.records.filter(record => record.id !== action.payload.id)
      });
    }
    case table.ActionTypes.INITIALIZE_SETTINGS: {
      return Object.assign({}, state, {
        settings: action.payload
      });
    }
    case table.ActionTypes.SELECT_RECORDS: {
      return Object.assign({}, state, {
        selectedRecords: action.payload
      });
    }
    case table.ActionTypes.DESELECT_RECORD: {
      return Object.assign({}, state, {
        selectedRecords: state.selectedRecords.filter(record => record.id !== action.payload.id)
      });
    }
    case table.ActionTypes.DESELECT_RECORDS: {
      return Object.assign({}, state, {
        selectedRecords: []
      });
    }
    default: {
      return state;
    }
  }
}

export const getRecords = (state: TableState) => state.records;
export const getSelectedRecords = (state: TableState) => state.selectedRecords;
export const getSettings = (state: TableState) => state.settings;
