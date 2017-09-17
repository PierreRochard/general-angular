import { Action } from '@ngrx/store';

import { GeneralMenuItem } from 'app/menubar/menubar.models';

export const GET_MENUBAR = '[Menubar] Get Menubar';
export const RECEIVE_MENUBAR = '[Menubar] Receive Menubar';

export class GetMenubarAction implements Action {
  readonly type = GET_MENUBAR;
}

export class ReceiveMenubarAction implements Action {
  readonly type = RECEIVE_MENUBAR;

  constructor(public payload: GeneralMenuItem[]) {
  }
}

export type MenubarActions = GetMenubarAction | ReceiveMenubarAction;
