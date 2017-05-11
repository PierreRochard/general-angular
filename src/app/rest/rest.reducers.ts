import {Response} from "@angular/http";

import {RestActions, RestActionTypes} from './rest.actions';


export interface RestState {
  posting: boolean;
  receivedForm: boolean;
  getting: boolean;
  response: Response;
}

const initialState: RestState = {
  posting: false,
  receivedForm: false,
  getting: false,
  response: null
};

export function restReducer (state = initialState, action: RestActions): RestState {
  switch (action.type) {
    case RestActionTypes.SEND_GET_REQUEST: {
      return Object.assign({}, state, {
        getting: true,
        received: false,
      })
    }
    case RestActionTypes.SEND_POST_REQUEST: {
      return Object.assign({}, state, {
        posting: true,
        received: false,
      })
    }
    case RestActionTypes.RECEIVED_RESPONSE: {
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

