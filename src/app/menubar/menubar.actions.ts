import {Response} from '@angular/http';

import {Action} from '@ngrx/store';

import {type} from '../util';

export const MenubarActionTypes = {
  GET_MENUBAR:     type('GET_MENUBAR'),
  RECEIVE_MENUBAR:  type('RECEIVE_MENUBAR'),
};

export class GetMenubarAction implements Action {
  type = MenubarActionTypes.GET_MENUBAR;
  constructor(public payload: string) { }
}

export class ReceiveMenubarAction implements Action {
  type = MenubarActionTypes.RECEIVE_MENUBAR;
  constructor(public payload: Response) {}
}

export type MenubarActions = GetMenubarAction | ReceiveMenubarAction;
