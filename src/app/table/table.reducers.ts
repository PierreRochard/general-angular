import * as table from './table.actions';


export interface State {
  records: any[];
}

const initialState: State = {
  records: null
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
    default: {
      return state;
    }
  }
}

export const getRecords = (state: State) => state.records;
