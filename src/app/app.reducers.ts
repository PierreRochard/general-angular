import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducers';
import * as fromRouter from '@ngrx/router-store';
import * as fromSchema from './schema/schema.reducers';

export interface State {
  auth: fromAuth.State;
  router: fromRouter.RouterState;
  schema: fromSchema.State;
}

const reducers = {
  auth: fromAuth.reducer,
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
export const getPaths = createSelector(getSchemaState, fromSchema.getPaths);
export const getDefinitions = createSelector(getSchemaState, fromSchema.getDefinitions);
export const getIsValid = createSelector(getSchemaState, fromSchema.getIsValid);

export const getMenuItems = createSelector(getSchemaState, fromSchema.getMenuItems);

export const getRouterState = (state: State) => state.router;
export const getSelectedPath = createSelector(getRouterState, (routerState) => {
  console.log(routerState.path);
  return routerState.path;
});

export const getSelectedPathName = createSelector(getSchemaState, fromSchema.getSelectedPathName);
// export const getSelectedPath = createSelector(getSchemaState, fromSchema.getSelectedPath);
export const getSelectedPathPostBodyDefinition = createSelector(getSchemaState, fromSchema.getSelectedPathPostBodyDefinition);
export const getSelectedPathPostBodyProperties = createSelector(getSchemaState, fromSchema.getSelectedPathPostBodyProperties);

export const getSelectedPathPostBodyRequiredPropertyNames = createSelector(getSelectedPathPostBodyDefinition, (selectedPathPostBodyDefinition) => {
  return selectedPathPostBodyDefinition.required;
});

export const getAuthState = (state: State) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);
