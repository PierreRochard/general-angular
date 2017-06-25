import {compose} from '@ngrx/core/compose';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {LocalStorageConfig, localStorageSync} from 'ngrx-store-localstorage';
import {createSelector} from 'reselect';

import {environment} from '../environments/environment';
import {AuthState, authReducer} from './auth/auth.reducers';
import {FormState, formReducer} from './form/form.reducers';
import {MenubarState, menubarReducer} from './menubar/menubar.reducers';
import {RestState, restReducer} from './rest/rest.reducers';
import {RouterState, routerReducer} from '@ngrx/router-store';
import {SchemaState, schemaReducer} from './schema/schema.reducers';
import {TableState, tableReducer} from './table/table.reducers';

export interface AppState {
  auth:    AuthState;
  form:    FormState,
  menubar: MenubarState;
  rest:    RestState;
  router:  RouterState;
  schema:  SchemaState;
  table:   TableState;
}

const reducers = {
  auth:    authReducer,
  form:    formReducer,
  menubar: menubarReducer,
  rest:    restReducer,
  router:  routerReducer,
  schema:  schemaReducer,
  table:   tableReducer,
};

const localStorageConfig: LocalStorageConfig = {
  keys: ['auth'],
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


// REST
export const getRestState = (state: AppState) => state.rest;
export const getResponse = (state: RestState) => state.response;
export const getRestResponse = createSelector(getRestState, getResponse);

// Schema
export const getSchemaState = (state: AppState) => state.schema;
export const getPathNames = createSelector(getSchemaState, (state: SchemaState) => Object.keys(state.paths));
export const getDefinitions = createSelector(getSchemaState, (state: SchemaState) => state.definitions);
export const getIsValid = createSelector(getSchemaState, (state: SchemaState) => state.isValid);
