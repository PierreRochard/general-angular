import {} from './actions';

import {Definition, Path, Property} from "./schema.models";
import {SchemaActions, SchemaActionTypes} from "./schema.actions";


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

export function schemaReducer(state = initialState, action: SchemaActions): SchemaState {
  switch (action.type) {
    case SchemaActionTypes.INVALIDATE_SCHEMA: {
      return Object.assign({}, state, {
        isValid: false,
      });
    }
    case SchemaActionTypes.UPDATE_SCHEMA: {
      return Object.assign({}, state, {
        paths: action.payload.paths,
        definitions: action.payload.definitions,
        lastUpdated: Date.now(),
        isValid: true,
      });
    }
    case SchemaActionTypes.SELECT_PATH: {
      let selectedPathName = action.payload;
      let selectedPath = state.paths[selectedPathName];
      let selectedPathPostBodyDefinition = null;
      // Todo: fix $ref
      // if (selectedPath.hasOwnProperty('post')){
      //   let definition_name = selectedPath.post.parameters
      //     .filter(parameter => ['args', 'body'].includes(parameter.name))[0].$ref.split('/').pop();
      //   selectedPathPostBodyDefinition = state.definitions[definition_name];
      // }
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

