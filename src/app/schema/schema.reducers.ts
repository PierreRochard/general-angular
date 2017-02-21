import { createSelector } from 'reselect';

import * as schema from './schema.actions';

import {Definition, Path} from "./schema.model";
import {create} from "domain";


export interface State {
  paths: { [name: string]: Path };
  definitions: { [name: string]: Definition };
  isValid: boolean;
  lastUpdated?: Date;
  selectedPathName?: string | null;
}

const initialState: State = {
  paths: {},
  definitions: {},
  isValid: false,
};

export function reducer(state = initialState, action: schema.Actions): State {
  switch (action.type) {
    case schema.ActionTypes.INVALIDATE_SCHEMA: {
      return Object.assign({}, state, {
        isValid: false,
      });
    }
    case schema.ActionTypes.REQUEST_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: true,
      })
    }
    case schema.ActionTypes.RECEIVE_SCHEMA: {
      return Object.assign({}, state, {
        isFetching: false,
        isValid: true,
        schema: action.payload,
        lastUpdated: Date.now(),
      })
    }
    default: {
      return state;
    }
  }
}

export const getPaths = (state: State) => state.paths;
export const getDefinitions = (state: State) => state.definitions;
export const getStatus = (state: State) => state.isValid;
export const getLastUpdated = (state: State) => state.lastUpdated;
export const getSelectedPathName = (state: State) => state.selectedPathName;

export const getPathNames = (state: State) => Object.keys(state.paths);
export const getDefinitionNames = (state: State) => Object.keys(state.definitions);

export const getSelectedPath = createSelector(getPaths, getSelectedPathName, (paths, selectedPathName) => {
  return paths[selectedPathName];
});
export const getSelectedPathPostBodyDefinition = createSelector(getSelectedPath, getDefinitions, (selectedPath, definitions) => {
  let definition_name = selectedPath.post.parameters.filter(parameter => parameter.name === 'args')[0].schema.$ref.split('/')[-1];
  return definitions[definition_name];
});
