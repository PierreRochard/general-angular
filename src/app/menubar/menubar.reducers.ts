import { MenuItem } from 'primeng/primeng';

import { MenubarActions, MenubarActionTypes } from './menubar.actions';
import { GeneralMenuItem } from './menubar.models';

export interface MenubarState {
  menuItems: MenuItem[] | null;
}

const initialState: MenubarState = {
  menuItems: null,
};

export function menubarReducer(state = initialState, action: MenubarActions): MenubarState {
  switch (action.type) {
    case MenubarActionTypes.RECEIVE_MENUBAR:
      return Object.assign({}, state, {
        menuItems: action.payload.map(item => {
          return Object.keys(item).reduce((result: GeneralMenuItem, key) => {
            // Removing keys that have a falsy value to avoid undesirable
            // menubar behavior
            if (item[key]) {
              result[key] = item[key];
            }
            return result;
          }, {})
        })
      });
    default:
      return state;
  }
}
