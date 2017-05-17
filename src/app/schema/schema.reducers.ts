import {Definition, Path} from './schema.models';
import {SchemaActions, SchemaActionTypes} from './schema.actions';


export interface SchemaState {
  paths: { [name: string]: Path };
  definitions: { [name: string]: Definition };
  isValid: boolean;
  lastUpdated: Date;
  selectedPathName?: string;
  selectedPath?: Path;
}

const initialState: SchemaState = {
  paths: {},
  definitions: {},
  isValid: false,
  lastUpdated: new Date(),
};

export function schemaReducer(state = initialState, action: SchemaActions): SchemaState {
  let selectedPath: Path;
  let selectedPathName: any;
  switch (action.type) {
    case SchemaActionTypes.INVALIDATE_SCHEMA:
      return Object.assign({}, state, {
        isValid: false,
      });

    case SchemaActionTypes.UPDATE_SCHEMA:
      return Object.assign({}, state, {
        paths: action.payload.paths,
        definitions: action.payload.definitions,
        lastUpdated: Date.now(),
        isValid: true,
      });

    case SchemaActionTypes.SELECT_PATH:
      selectedPathName = action.payload;
      selectedPath = state.paths[selectedPathName];

      return Object.assign({}, state, {
        selectedPathName: selectedPathName,
        selectedPath: selectedPath
      });

    default:
      return state;

  }
}

