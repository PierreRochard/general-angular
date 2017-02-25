import {Response} from "@angular/http";

import * as rpc from './rpc.actions';



export interface State {
  submitted: boolean;
  received: boolean;
  response?: Response;
}

const initialState: State = {
  submitted: false,
  received: false,
};

export function reducer(state = initialState, action: rpc.Actions): State {
  switch (action.type) {
    case rpc.ActionTypes.SUBMIT_FORM: {
      return Object.assign({}, state, {
        submitted: true,
        received: false,
      })
    }
    case rpc.ActionTypes.RECEIVE_POST: {
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
