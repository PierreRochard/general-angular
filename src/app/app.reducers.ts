import { ActionReducer, ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
// import {storeFreeze} from 'ngrx-store-freeze';

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
  router: RouterReducerState<RouterStateUrl>;
  table: TableState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  form: formReducer,
  menubar: menubarReducer,
  rest: restReducer,
  router: routerReducer,
  table: tableReducer,
};

const STORAGE_KEY = 'appState';

function getPersistedState(): Partial<AppState> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function persistState(state: AppState): void {
  try {
    const toPersist = {
      auth: state.auth,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  } catch {
    // Ignore persistence errors (e.g., storage unavailable)
  }
}

export function storageSyncMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const hydratedState = state ?? getPersistedState();
    const nextState = reducer(hydratedState, action);
    if (nextState) {
      persistState(nextState);
    }
    return nextState;
  };
}

export const metaReducers: MetaReducer<any, any>[] = !environment.production
  ? [
    // storeFreeze,
    storageSyncMetaReducer
  ]
  : [
    // storeFreeze,
    storageSyncMetaReducer
  ];


// REST
export const getRestState = (state: AppState) => state.rest;
export const getResponse = (state: RestState) => state.response;
export const getRestResponse = createSelector(getRestState, getResponse);


export const getRouterState = (state: AppState) => state.router;
export const getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);
export const getCurrentParams = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.params);
