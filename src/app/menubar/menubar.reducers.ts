import { createReducer, on } from '@ngrx/store';
import { receiveMenubar } from './menubar.actions';
import { GeneralMenuItem } from './menubar.models';

export interface MenubarState {
  menuItems: GeneralMenuItem[] | null;
}

export const initialState: MenubarState = {
  menuItems: null,
};

export const menubarReducer = createReducer(
  initialState,
  on(receiveMenubar, (state, { items }) => ({
    ...state,
    menuItems: items.map((item: GeneralMenuItem) => {
      const cleaned: GeneralMenuItem = { ...item };
      Object.keys(cleaned).forEach((key) => {
        if (!(cleaned as any)[key]) {
          delete (cleaned as any)[key];
        }
      });
      return cleaned;
    })
  })),
);
