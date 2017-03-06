import * as table from './table.actions';


export interface State {
  records: any[];
  selectedRecords: any[];
}

const initialState: State = {
  records: null,
  selectedRecords: null,
};

export function reducer(state = initialState, action: table.Actions): State {
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
    case table.ActionTypes.SELECT_RECORDS: {
      return Object.assign({}, state, {
        selectedRecords: action.payload
      });
    }
    default: {
      return state;
    }
  }
}

export const getRecords = (state: State) => state.records;
export const getSelectedRecords = (state: State) => state.selectedRecords;
