import { MenuItem } from 'primeng/primeng';

import {MenubarActions, MenubarActionTypes} from './menubar.actions';

export interface MenubarState {
  menuItems: MenuItem[];
}

const initialState: MenubarState = {
  menuItems: null,
};

export function menubarReducer (state = initialState, action: MenubarActions): MenubarState {
  switch (action.type) {
    case MenubarActionTypes.RECEIVE_MENUBAR:
      return Object.assign({}, state, {
        menuItems: action.payload.map(item => Object.keys(item).reduce((result, key) => {
          // Removing keys that have a null value to avoid undesirable
          // menubar behavior
          if (item[key] !== null && item[key] !== undefined && item[key].length > 0) {
            result[key] = item[key];
          }
          return result;
        }, {}))
      });
    default:
      return state;
  }
}
