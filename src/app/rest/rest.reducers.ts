import { createReducer, on } from '@ngrx/store';
import { receivedResponse, sendGetRequest, sendPostRequest } from './rest.actions';


export interface RestState {
  posting: boolean;
  receivedForm: boolean;
  getting: boolean;
  received: boolean;
  response: any | null;
}

export const initialState: RestState = {
  posting: false,
  receivedForm: false,
  getting: false,
  received: false,
  response: null
};

export const restReducer = createReducer(
  initialState,
  on(sendGetRequest, state => ({
    ...state,
    getting: true,
    received: false,
  })),
  on(sendPostRequest, state => ({
    ...state,
    posting: true,
    received: false,
  })),
  on(receivedResponse, (state, { response }) => ({
    ...state,
    posting: false,
    received: true,
    response,
  })),
);
