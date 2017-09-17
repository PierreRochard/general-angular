import { Action } from '@ngrx/store';

import { GeneralMenuItem } from 'app/menubar/menubar.models';

import { type } from '../util';

export const MenubarActionTypes = {
  GET_MENUBAR: type('GET_MENUBAR'),
  RECEIVE_MENUBAR: type('RECEIVE_MENUBAR'),
};

export class GetMenubarAction implements Action {
  type = MenubarActionTypes.GET_MENUBAR;

  constructor(public payload: GeneralMenuItem[]) {
  }
}

export class ReceiveMenubarAction implements Action {
  type = MenubarActionTypes.RECEIVE_MENUBAR;

  constructor(public payload: GeneralMenuItem[]) {
  }
}

export type MenubarActions = GetMenubarAction | ReceiveMenubarAction;
