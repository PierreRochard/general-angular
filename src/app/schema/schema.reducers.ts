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
        paths: action.payload.paths,
        definitions: action.payload.definitions,
        isFetching: false,
        isValid: true,
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
export const getIsValid = (state: State) => state.isValid;
export const getLastUpdated = (state: State) => state.lastUpdated;
export const getSelectedPathName = (state: State) => state.selectedPathName;

export const getPathNames = (state: State) => Object.keys(state.paths);
export const getDefinitionNames = (state: State) => Object.keys(state.definitions);

export const getMenuItems = createSelector(getPathNames, (pathNames) => {
  let menuItems = pathNames
    .map(pathName => {
      let icon: string;
      if (pathName === '/') {
          icon = 'fa-home';
      } else if (pathName.startsWith('/rpc/')) {
          icon = 'fa-terminal';
      } else {
          icon = 'fa-table';
      }
      return {label: pathName,
              icon: icon,
              routerLink: [pathName.substring(1)]}
    });
  // let homeMenuItem = {label: 'Home', icon: 'fa-home', routerLink: ['']};
  return [...menuItems]
});

export const getSelectedPath = createSelector(getPaths, getSelectedPathName, (paths, selectedPathName) => {
  return paths[selectedPathName];
});
export const getSelectedPathPostBodyDefinition = createSelector(getSelectedPath, getDefinitions, (selectedPath, definitions) => {
  let definition_name = selectedPath.post.parameters.filter(parameter => parameter.name === 'args')[0].schema.$ref.split('/')[-1];
  return definitions[definition_name];
});
export const getSelectedPathPostBodyRequiredProperties = createSelector(getSelectedPathPostBodyDefinition, (selectedPathPostBodyDefinition) => {
  return selectedPathPostBodyDefinition.required;
});
export const getSelectedPathPostBodyProperties = createSelector(getSelectedPathPostBodyDefinition, (selectedPathPostBodyDefinition) => {
  return Object.keys(selectedPathPostBodyDefinition.properties).map(property_name => {
    let property = selectedPathPostBodyDefinition.properties[property_name];
    property['name'] = property_name;
    return property
  })
});
