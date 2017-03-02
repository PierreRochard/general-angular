import {Response} from "@angular/http";

import * as rest from './rest.actions';


export interface State {
  posting: boolean;
  receivedForm: boolean;
  getting: boolean;
  response: Response;
}

const initialState: State = {
  posting: false,
  receivedForm: false,
  getting: false,
  response: null
};

export function reducer(state = initialState, action: rest.Actions): State {
  switch (action.type) {
    case rest.ActionTypes.SEND_GET_REQUEST: {
      return Object.assign({}, state, {
        getting: true,
        received: false,
      })
    }
    case rest.ActionTypes.SEND_POST_REQUEST: {
      return Object.assign({}, state, {
        posting: true,
        received: false,
      })
    }
    case rest.ActionTypes.RECEIVED_RESPONSE: {
      return Object.assign({}, state, {
        posting: false,
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
