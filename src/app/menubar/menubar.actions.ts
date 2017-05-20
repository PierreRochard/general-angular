import {Action} from '@ngrx/store';

import {type} from '../util';
import {RequestActionPayload} from '../rest/rest.models';

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
  constructor(public payload: RequestActionPayload) {}
}

export type MenubarActions = GetMenubarAction | ReceiveMenubarAction;
