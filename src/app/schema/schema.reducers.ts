import * as schema from './schema.actions';

import {Definition, Path, Property} from "./schema.models";


export interface SchemaState {
  paths: { [name: string]: Path };
  definitions: { [name: string]: Definition };
  isValid: boolean;
  lastUpdated: Date;
  selectedPathName?: string;
  selectedPath?: Path;
  selectedPathPostBodyDefinition?: Definition;
  selectedPathPostBodyProperties?: {[name: string]: Property[]; };
  selectedPathPostBodyRequiredPropertyNames?: string[],

}

const initialState: SchemaState = {
  paths: {},
  definitions: {},
  isValid: false,
  lastUpdated: new Date(),
};

export function reducer(state = initialState, action: schema.Actions): SchemaState {
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
      });
    }
    case schema.ActionTypes.SELECT_PATH: {
      let selectedPathName = action.payload;
      let selectedPath = state.paths[selectedPathName];
      let selectedPathPostBodyDefinition = null;

      if (selectedPath.hasOwnProperty('post')){
        let definition_name = selectedPath.post.parameters
          .filter(parameter => ['args', 'body'].includes(parameter.name))[0].schema.$ref.split('/').pop();
        selectedPathPostBodyDefinition = state.definitions[definition_name];
      }
      let selectedPathPostBodyProperties = null;
      if (!!selectedPathPostBodyDefinition) {
        selectedPathPostBodyProperties = selectedPathPostBodyDefinition.properties
      }
      let selectedPathPostBodyRequiredPropertyNames = null;
      if (!!selectedPathPostBodyDefinition) {
        selectedPathPostBodyRequiredPropertyNames = selectedPathPostBodyDefinition.required || [];
      }
      return Object.assign({}, state, {
        selectedPathName: selectedPathName,
        selectedPath: selectedPath,
        selectedPathPostBodyDefinition: selectedPathPostBodyDefinition,
        selectedPathPostBodyProperties: selectedPathPostBodyProperties,
        selectedPathPostBodyRequiredPropertyNames: selectedPathPostBodyRequiredPropertyNames,
      })
    }
    default: {
      return state;
    }
  }
}

export const getPaths = (state: SchemaState) => state.paths;
export const getDefinitions = (state: SchemaState) => state.definitions;
export const getIsValid = (state: SchemaState) => state.isValid;
export const getLastUpdated = (state: SchemaState) => state.lastUpdated;

export const getPathNames = (state: SchemaState) => Object.keys(state.paths);
export const getDefinitionNames = (state: SchemaState) => Object.keys(state.definitions);
