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
export const getPathNames = createSelector(getSchemaState, fromSchema.getPathNames);
export const getDefinitions = createSelector(getSchemaState, fromSchema.getDefinitions);
export const getIsValid = createSelector(getSchemaState, fromSchema.getIsValid);

export const getRouterState = (state: State) => state.router;

export const getSelectedPathName = createSelector(getRouterState, (routerState) => {
  return routerState.path;
});

export const getSelectedPath = createSelector(getPaths, getSelectedPathName, (paths, selectedPathName) => {
  return paths[selectedPathName];
});

export const getSelectedPathPostBodyDefinition = createSelector(getSelectedPath, getDefinitions, (selectedPath, definitions) => {
  if (selectedPath.hasOwnProperty('post')){
    let definition_name = selectedPath.post.parameters
      .filter(parameter => parameter.name === 'args')[0].schema.$ref.split('/').pop();
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
    return selectedPathPostBodyDefinition.required;
  } else {
    return null;
  }
});

export const getAuthState = (state: State) => state.auth;
export const getToken = createSelector(getAuthState, fromAuth.getToken);
