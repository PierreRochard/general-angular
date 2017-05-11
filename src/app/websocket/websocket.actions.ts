import { Action } from '@ngrx/store';

import { type } from '../util';

export const WebsocketActionTypes = {
  CONNECT:   type('CONNECT'),
};

export class ConnectAction implements Action {
  type = WebsocketActionTypes.CONNECT;
  constructor(public payload: string) {}
}

export type WebsocketActions
  = ConnectAction;
