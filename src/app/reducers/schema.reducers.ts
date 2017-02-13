import {ActionReducer} from "@ngrx/store";

import * as schema from '../actions/schema.actions';

export interface State {
  schema: any;
  isFetching: boolean,
  didInvalidate?: boolean,
  lastUpdated?: Date,
}

const initialState: State = {
  schema: {},
  didInvalidate: false,
  isFetching: false,
};

export function reducer(state = initialState, action: schema.Actions): State {
  switch (action.type) {
    case schema.ActionTypes.INVALIDATE_SCHEMA: {
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    }
    case schema.ActionTypes.REQUEST_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    }
    case schema.ActionTypes.RECEIVE_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        schema: action.payload,
        lastUpdated: Date.now(),
      })
    }
    default: {
      return state;
    }
  }
}
