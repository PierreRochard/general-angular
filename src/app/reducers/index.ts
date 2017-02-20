import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromAuth from '../auth/auth.reducers';
import * as fromEndpoints from './endpoint.reducers';
import * as fromSchema from './schema.reducers';

export interface State {
  auth: fromAuth.State;
  endpoints: fromEndpoints.State;
  schema: fromSchema.State;
  router: fromRouter.RouterState;
}

const reducers = {
  auth: fromAuth.reducer,
  endpoints: fromEndpoints.reducer,
  schema:    fromSchema.reducer,
  router:    fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    console.log(action);
    return developmentReducer(state, action);
  }
}

export const getSchemaState = (state: State) => state.schema;
export const getSchema = createSelector(getSchemaState, fromSchema.getSchema);
export const getStatus = createSelector(getSchemaState, fromSchema.getStatus);

export const getEndpointsState = (state: State) => state.endpoints;
export const getEndpoints = createSelector(getEndpointsState, fromEndpoints.getEndpoints);
export const getMenuItems = createSelector(getEndpointsState, fromEndpoints.getMenuItems);
export const getEntities = createSelector(getEndpointsState, fromEndpoints.getEntities);
export const getSelectedEndpointName = createSelector(getEndpointsState, fromEndpoints.getSelectedEndpointName);
export const getEndpointProperties = createSelector(getEndpointsState, fromEndpoints.getEndpointProperties);
export const getSelectedEndpoint = createSelector(getEndpointsState, fromEndpoints.getSelectedEndpoint);
export const getSelectedEndpointProperties = createSelector(getEndpointsState, fromEndpoints.getSelectedEndpointProperties);

export const getAuthState = (state: State) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);
