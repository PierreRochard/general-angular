import { MenubarActions, RECEIVE_MENUBAR } from './menubar.actions';
import { GeneralMenuItem } from './menubar.models';

export interface MenubarState {
  menuItems: GeneralMenuItem[] | null;
}

const initialState: MenubarState = {
  menuItems: null,
};

export function menubarReducer(state = initialState, action: MenubarActions): MenubarState {
  switch (action.type) {
    case RECEIVE_MENUBAR:
      console.log(action);
      return Object.assign({}, state, {
        menuItems: action.payload.map((item: GeneralMenuItem) => {
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
