import * as endpoints from '../actions/endpoint.actions';
import {Endpoint, EndpointProperty} from "../models/endpoint.model";
import {MenuItem} from "primeng/components/common/api";

export interface State {
  names: string[];
  entities: { [name: string]: Endpoint };
  properties: EndpointProperty[];
  menuItems: MenuItem[];
  selectedEndpointName: string | null;
}

const initialState: State = {
  names: [],
  entities: {},
  properties: [],
  menuItems: [{label: 'Home',
               icon: 'fa-home',
               routerLink: ['']}],
  selectedEndpointName: null,
};

export function reducer(state = initialState, action: endpoints.Actions): State {
  switch (action.type) {
    case endpoints.ActionTypes.SELECT_ENDPOINT: {
      return {
        names: state.names,
        entities: state.entities,
        properties: state.properties,
        menuItems: state.menuItems,
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
        return {name: modified_endpoint_name, type: endpoint_type, tag: endpoint_name}
      });
      let menuItems = endpoints.map(endpoint => {
        let icon = 'fa-table';
        let path = '/';
        if (endpoint.type === 'rpc') {
          icon = 'fa-terminal';
          path += 'rpc/'
        }
        return {label: endpoint.name,
                icon: icon,
                routerLink: [path + endpoint.name]}
      });
      let entities = {};
      endpoints.forEach(endpoint => entities[endpoint.name] = endpoint);
      return Object.assign({}, state, {
        names: Object.keys(entities),
        entities: entities,
        menuItems: [...initialState.menuItems, ...menuItems]
      });
    }
    case endpoints.ActionTypes.ADD_PROPERTIES: {
      let properties = [];
      let definitions = action.payload;
      let new_endpoints = Object.keys(definitions).map(endpoint_name => {
        let modified_endpoint_name = endpoint_name.replace('(rpc) ', '')
        let definition = definitions[endpoint_name];
        let endpoint_properties = Object.keys(definition.properties).map(property => {
          let is_required = definition.required.includes(property);
          let new_property = {
              name: property,
              endpoint_name: modified_endpoint_name,
              tag: endpoint_name,
              required: is_required,
              format: definition.properties[property].format,
              type: definition.properties[property].type,
            };
          console.log(new_property);
          properties = [...properties, new_property];
        })
      });
      return Object.assign({}, state, {
        properties: [...initialState.properties, ...properties],
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

export const getEndpoints = (state: State) => state.names;
export const getMenuItems = (state: State) => state.menuItems;
export const getEndpointProperties = (state: State) => state.properties;
