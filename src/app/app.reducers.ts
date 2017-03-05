import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducers';
import * as fromRest from './rest/rest.reducers';
import * as fromRouter from '@ngrx/router-store';
import * as fromSchema from './schema/schema.reducers';
import * as fromTable from './table/table.reducers';
import {localStorageSync} from "ngrx-store-localstorage";

export interface State {
  auth: fromAuth.State;
  rest: fromRest.State;
  router: fromRouter.RouterState;
  schema: fromSchema.State;
  table: fromTable.State;
}

const reducers = {
  auth:      fromAuth.reducer,
  rest:      fromRest.reducer,
  router:    fromRouter.routerReducer,
  schema:    fromSchema.reducer,
  table:     fromTable.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze,
                                                         localStorageSync(['auth'], true),
                                                          combineReducers)(reducers);
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
export const getPathNames = createSelector(getSchemaState, fromSchema.getPathNames);
export const getDefinitions = createSelector(getSchemaState, fromSchema.getDefinitions);
export const getIsValid = createSelector(getSchemaState, fromSchema.getIsValid);

export const getRouterState = (state: State) => state.router;

export const routerPath = createSelector(getRouterState, (routerState) => {
  return routerState.path;
});

export const getSelectedPath = createSelector(getPaths, routerPath, (paths, selectedPathName) => {
  return paths[selectedPathName];
});

export const getSelectedPathPostBodyDefinition = createSelector(getSelectedPath, getDefinitions, (selectedPath, definitions) => {
  if (selectedPath.hasOwnProperty('post')){
    let definition_name = selectedPath.post.parameters
      .filter(parameter => ['args', 'body'].includes(parameter.name))[0].schema.$ref.split('/').pop();
    return definitions[definition_name];
  } else {
    return null;
  }
});

export const getSelectedPathPostBodyProperties = createSelector(getSelectedPathPostBodyDefinition, (selectedPathPostBodyDefinition) => {
  if (!!selectedPathPostBodyDefinition) {
    return selectedPathPostBodyDefinition.properties
  } else {
    return null;
  }
});

export const getSelectedPathPostBodyRequiredPropertyNames = createSelector(getSelectedPathPostBodyDefinition, (selectedPathPostBodyDefinition) => {
  if (!!selectedPathPostBodyDefinition) {
    return selectedPathPostBodyDefinition.required || [];
  } else {
    return null;
  }
});

export const getAuthState = (state: State) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getApiUrl = createSelector(getAuthState, fromAuth.getApiUrl);

export const getRestState = (state: State) => state.rest;
export const getResponse = createSelector(getRestState, fromRest.getResponse);

export const getTableState = (state: State) => state.table;
export const getRecords = createSelector(getTableState, fromTable.getRecords);
export const getSelectedRecords = createSelector(getTableState, fromTable.getSelectedRecords);
