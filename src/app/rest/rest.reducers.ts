import {Response} from "@angular/http";

import * as rest from './rest.actions';


export interface State {
  submittedForm: boolean;
  receivedForm: boolean;
  gettingSchema: boolean;
  response: Response;
}

const initialState: State = {
  submittedForm: false,
  receivedForm: false,
  gettingSchema: false,
  response: null
};

export function reducer(state = initialState, action: rest.Actions): State {
  switch (action.type) {
    case rest.ActionTypes.REQUEST_SCHEMA: {
      return Object.assign({}, state, {
        gettingSchema: true,
      })
    }
    case rest.ActionTypes.RECEIVED_SCHEMA: {
      return Object.assign({}, state, {
        gettingSchema: false,
      })
    }
    case rest.ActionTypes.SUBMIT_FORM: {
      return Object.assign({}, state, {
        submitted: true,
        received: false,
      })
    }
    case rest.ActionTypes.RECEIVED_POST_RESPONSE: {
      return Object.assign({}, state, {
        submitted: false,
        received: true,
        response: action.payload,
      })
    }
    default: {
      return state;
    }
  }
}

export const getResponse = (state: State) => state.response;
