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
      return Object.assign({}, state, {
        menuItems: action.payload.map((item: GeneralMenuItem) => {
          const cleaned: GeneralMenuItem = { ...item };
          Object.keys(cleaned).forEach((key) => {
            // Removing keys that have a falsy value to avoid undesirable menubar behavior
            if (!cleaned[key]) {
              delete (cleaned as any)[key];
            }
          });
          return cleaned;
        })
      });
    default:
      return state;
  }
}
