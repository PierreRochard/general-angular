import * as auth from '../auth/auth.actions';

export interface State {
  token: string;
}

const initialState: State = {
  token: '',
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.ADD_TOKEN: {
      return Object.assign({}, state, { token: action.payload.token });
    }
    case auth.ActionTypes.REMOVE_TOKEN: {
      return Object.assign({}, state, { token: ''});
    }
    default: {
      return state;
    }
  }
}

export const getToken = (state: State) => state.token;
