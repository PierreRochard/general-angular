import * as endpoints from '../actions/endpoint.actions';
import {Endpoint} from "../models/endpoint.model";

export interface State {
  names: string[];
  entities: { [name: string]: Endpoint };
  selectedEndpointName: string | null;
}

const initialState: State = {
  names: [],
  entities: {},
  selectedEndpointName: null,
};

export function reducer(state = initialState, action: endpoints.Actions): State {
  switch (action.type) {
    case endpoints.ActionTypes.SELECT_ENDPOINT: {
      return {
        names: state.names,
        entities: state.entities,
        selectedEndpointName: action.payload
      };
    }
    case endpoints.ActionTypes.ADD_ENDPOINTS: {
      let endpoints = Object.keys(action.payload).map(endpoint_name => {
        let endpoint_type = 'table';
        let modified_endpoint_name = endpoint_name;
        if (endpoint_name.startsWith('(rpc) ')) {
          endpoint_type = 'rpc';
          modified_endpoint_name = modified_endpoint_name.replace('(rpc) ', '');
        }
        return {name: modified_endpoint_name, type: endpoint_type}
      });
      let entities = {};
      endpoints.forEach(endpoint => entities[endpoint.name] = endpoint);
      return Object.assign({}, state, {
        names: Object.keys(endpoints),
        entities: entities,
      });
    }
    case endpoints.ActionTypes.INITIALIZE_ENDPOINTS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getEndpoints = (state: State) => {
  console.log(state.names);
  return state.names;
}
