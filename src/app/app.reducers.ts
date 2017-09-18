import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
// import {storeFreeze} from 'ngrx-store-freeze';
import {LocalStorageConfig, localStorageSync} from 'ngrx-store-localstorage';
import {createSelector} from 'reselect';

import {environment} from '../environments/environment';
import {AuthState, authReducer} from './auth/auth.reducers';
import {FormState, formReducer} from './form/form.reducers';
import {MenubarState, menubarReducer} from './menubar/menubar.reducers';
import {RestState, restReducer} from './rest/rest.reducers';
import {TableState, tableReducer} from './table/table.reducers';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.serializer';

export interface AppState {
  auth: AuthState;
  form: FormState,
  menubar: MenubarState;
  rest: RestState;
  routerReducer: RouterReducerState<RouterStateUrl>;
  table: TableState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  form: formReducer,
  menubar: menubarReducer,
  rest: restReducer,
  routerReducer: routerReducer,
  table: tableReducer,
};

const localStorageConfig: LocalStorageConfig = {
  keys: ['auth'],
  rehydrate: true,
  storage: localStorage,
  removeOnUndefined: false,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
   return localStorageSync(localStorageConfig)(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = !environment.production
  ? [
    // storeFreeze,
    localStorageSyncReducer
  ]
  : [
    // storeFreeze,
    localStorageSyncReducer
  ];


// REST
export const getRestState = (state: AppState) => state.rest;
export const getResponse = (state: RestState) => state.response;
export const getRestResponse = createSelector(getRestState, getResponse);


export const getRouterState = (state: AppState) => state.routerReducer;
export const getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);
export const getCurrentParams = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.params);
