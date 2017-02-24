import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducers';
import * as fromSchema from './schema/schema.reducers';
import {create} from "domain";

export interface State {
  auth: fromAuth.State;
  schema: fromSchema.State;
  router: fromRouter.RouterState;
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


export const getSelectedPathName = createSelector(getSchemaState, fromSchema.getSelectedPathName);
export const getSelectedPath = createSelector(getSchemaState, fromSchema.getSelectedPath);
export const getSelectedPathPostBodyDefinition = createSelector(getSchemaState, fromSchema.getSelectedPathPostBodyDefinition);
export const getSelectedPathPostBodyProperties = createSelector(getSchemaState, fromSchema.getSelectedPathPostBodyProperties);
export const getSelectedPathPostBodyRequiredPropertyNames = createSelector(getSchemaState, fromSchema.getSelectedPathPostBodyRequiredPropertyNames);

export const getAuthState = (state: State) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);
