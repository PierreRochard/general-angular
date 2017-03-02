import * as auth from '../auth/auth.actions';

export interface State {
  token: string;
  apiUrl: string;
}

const initialState: State = {
  token: null,
  apiUrl: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.ADD_TOKEN: {
      return Object.assign({}, state, { token: action.payload });
    }
    case auth.ActionTypes.REMOVE_TOKEN: {
      return Object.assign({}, state, { token: null});
    }
    case auth.ActionTypes.ADD_APIURL: {
      return Object.assign({}, state, { apiUrl: action.payload });
    }
    case auth.ActionTypes.REMOVE_APIURL: {
      return Object.assign({}, state, { apiUrl: null})
    }
    default: {
      return state;
    }
  }
}

export const getToken = (state: State) => state.token;
export const getApiUrl = (state: State) => state.apiUrl;
