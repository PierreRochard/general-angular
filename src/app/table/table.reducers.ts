import * as table from './table.actions';


export interface State {
  records: any[];
}

const initialState: State = {
  records: null
};

export function reducer(state = initialState, action: table.Actions): State {
  switch (action.type) {
    case table.ActionTypes.POPULATE_RECORDS: {
      return Object.assign({}, state, {
        records: action.payload
      });
    }
    default: {
      return state;
    }
  }
}

export const getRecords = (state: State) => state.records;
