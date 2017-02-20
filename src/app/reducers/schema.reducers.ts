import * as schema from '../actions/schema.actions';

export interface State {
  schema: any;
  isFetching: boolean,
  valid_status: boolean,
  lastUpdated?: Date,
}

const initialState: State = {
  schema: {'definitions': {}},
  valid_status: false,
  isFetching: false,
};

export function reducer(state = initialState, action: schema.Actions): State {
  switch (action.type) {
    case schema.ActionTypes.INVALIDATE_SCHEMA: {
      return Object.assign({}, state, {
        valid_status: false,
      });
    }
    case schema.ActionTypes.REQUEST_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: true,
      })
    }
    case schema.ActionTypes.RECEIVE_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: false,
        valid_status: true,
        schema: action.payload,
        lastUpdated: Date.now(),
      })
    }
    default: {
      return state;
    }
  }
}

export const getSchema = (state: State) => state.schema;
export const getStatus = (state: State) => state.valid_status;
