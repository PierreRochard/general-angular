import {compose} from '@ngrx/core/compose';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
import {createSelector} from 'reselect';

import {environment} from '../environments/environment';
import {AuthState, authReducer} from './auth/auth.reducers';
import {MenubarState, menubarReducer} from './menubar/menubar.reducers';
import {RestState, restReducer} from './rest/rest.reducers';
import {RouterState, routerReducer} from '@ngrx/router-store';
import {SchemaState, schemaReducer} from './schema/schema.reducers';
import {TableState, tableReducer} from './table/table.reducers';

export interface AppState {
  auth:    AuthState;
  menubar: MenubarState;
  rest:    RestState;
  router:  RouterState;
  schema:  SchemaState;
  table:   TableState;
}

const reducers = {
  auth:    authReducer,
  menubar: menubarReducer,
  rest:    restReducer,
  router:  routerReducer,
  schema:  schemaReducer,
  table:   tableReducer,
};

const localStorageConfig: LocalStorageConfig = {
  keys: ['auth', 'menubar'],
  rehydrate: true,
  storage: localStorage,
  removeOnUndefined: false
};

const developmentReducer: ActionReducer<AppState> = compose(
  storeFreeze,
  localStorageSync(localStorageConfig),
  combineReducers)(reducers);

const productionReducer: ActionReducer<AppState> = compose(
  localStorageSync(localStorageConfig),
  combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    console.log(action);
    return developmentReducer(state, action);
  }
}

// State
export const getState = (state: AppState) => state;


// Auth
export const getAuthState = (state: AppState) => state.auth;
export const getToken = (state: AuthState) => state.token;
export const getAuthToken = createSelector(getAuthState, getToken);


// REST
export const getRestState = (state: AppState) => state.rest;
export const getResponse = (state: RestState) => state.response;
export const getRestResponse = createSelector(getRestState, getResponse);


// Router
export const getRouterState = (state: AppState) => state.router;

// Schema
export const getLastUpdated = (state: SchemaState) => state.lastUpdated;
export const getDefinitionNames = (state: SchemaState) => Object.keys(state.definitions);
export const getSchemaState = (state: AppState) => state.schema;
export const getPaths = createSelector(getSchemaState, (state: SchemaState) => state.paths);
export const getPathNames = createSelector(getSchemaState, (state: SchemaState) => Object.keys(state.paths));
export const getDefinitions = createSelector(getSchemaState, (state: SchemaState) => state.definitions);
export const getIsValid = createSelector(getSchemaState, (state: SchemaState) => state.isValid);

// Table
export const getTableState = (state: AppState) => state.table;
export const getRecords = createSelector(getTableState, (state: TableState) => state.records);
export const getSelectedRecords = createSelector(getTableState, (state: TableState) => state.selectedRecords);
