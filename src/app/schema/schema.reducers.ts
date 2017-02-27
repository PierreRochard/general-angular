import * as schema from './schema.actions';

import {Definition, Path} from "./schema.models";


export interface State {
  paths: { [name: string]: Path };
  definitions: { [name: string]: Definition };
  isValid: boolean;
  lastUpdated?: Date;
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
    case schema.ActionTypes.UPDATE_SCHEMA: {
      return Object.assign({}, state, {
        paths: action.payload.paths,
        definitions: action.payload.definitions,
        lastUpdated: Date.now(),
        isValid: true,
      })
    }
    default: {
      return state;
    }
  }
}

export const getPaths = (state: State) => state.paths;
export const getDefinitions = (state: State) => state.definitions;
export const getIsValid = (state: State) => state.isValid;
export const getLastUpdated = (state: State) => state.lastUpdated;

export const getPathNames = (state: State) => Object.keys(state.paths);
export const getDefinitionNames = (state: State) => Object.keys(state.definitions);
