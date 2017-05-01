import { createSelector } from 'reselect';
import {ActionReducer, State} from '@ngrx/store';
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

export interface AppState {
  auth: fromAuth.State;
  rest: fromRest.RestState;
  router: fromRouter.RouterState;
  schema: fromSchema.SchemaState;
  table: fromTable.TableState;
}

const reducers = {
  auth:      fromAuth.reducer,
  rest:      fromRest.reducer,
  router:    fromRouter.routerReducer,
  schema:    fromSchema.reducer,
  table:     fromTable.reducer,
};

const developmentReducer: ActionReducer<AppState> = compose(
  // storeFreeze,
  localStorageSync(['auth'], true),
  combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    console.log(action);
    return developmentReducer(state, action);
  }
}

export const getState = (state: AppState) => state;
export const getRouterState = (state: AppState) => state.router;

export const getSchemaState = (state: AppState) => state.schema;
export const getPaths = createSelector(getSchemaState, fromSchema.getPaths);
export const getPathNames = createSelector(getSchemaState, fromSchema.getPathNames);
export const getDefinitions = createSelector(getSchemaState, fromSchema.getDefinitions);
export const getIsValid = createSelector(getSchemaState, fromSchema.getIsValid);

export const getAuthState = (state: AppState) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);

export const getRestState = (state: AppState) => state.rest;
export const getResponse = createSelector(getRestState, fromRest.getResponse);

export const getTableState = (state: AppState) => state.table;
export const getRecords = createSelector(getTableState, fromTable.getRecords);
export const getSelectedRecords = createSelector(getTableState, fromTable.getSelectedRecords);
