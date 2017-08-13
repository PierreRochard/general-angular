import {ActionReducer, ActionReducerMap} from '@ngrx/store';
// import {storeFreeze} from 'ngrx-store-freeze';
// import {LocalStorageConfig, localStorageSync} from 'ngrx-store-localstorage';
import {createSelector} from 'reselect';

import {environment} from '../environments/environment';
import {AuthState, authReducer} from './auth/auth.reducers';
import {FormState, formReducer} from './form/form.reducers';
import {MenubarState, menubarReducer} from './menubar/menubar.reducers';
import {RestState, restReducer} from './rest/rest.reducers';
import {SchemaState, schemaReducer} from './schema/schema.reducers';
import {TableState, tableReducer} from './table/table.reducers';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export interface AppState {
  auth: AuthState;
  form: FormState,
  menubar: MenubarState;
  rest: RestState;
  routerReducer: RouterReducerState;
  schema: SchemaState;
  table: TableState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  form: formReducer,
  menubar: menubarReducer,
  rest: restReducer,
  routerReducer: routerReducer,
  schema: schemaReducer,
  table: tableReducer,
};

// const localStorageConfig: LocalStorageConfig = {
//   keys: ['auth'],
//   rehydrate: true,
//   storage: localStorage,
//   removeOnUndefined: false,
// };

export const metaReducers: ActionReducer<any, any>[] = !environment.production
  ? [
    // storeFreeze,
    // localStorageSync(localStorageConfig)
  ]
  : [
    // storeFreeze,
    // localStorageSync(localStorageConfig)
  ];


// REST
export const getRestState = (state: AppState) => state.rest;
export const getResponse = (state: RestState) => state.response;
export const getRestResponse = createSelector(getRestState, getResponse);

// Schema
export const getSchemaState = (state: AppState) => state.schema;
export const getPathNames = createSelector(getSchemaState, (state: SchemaState) => Object.keys(state.paths));
export const getDefinitions = createSelector(getSchemaState, (state: SchemaState) => state.definitions);
export const getIsValid = createSelector(getSchemaState, (state: SchemaState) => state.isValid);
