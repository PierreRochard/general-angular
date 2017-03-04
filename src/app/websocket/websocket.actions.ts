import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  CONNECT:   type('CONNECT'),
};

export class ConnectAction implements Action {
  type = ActionTypes.CONNECT;
  constructor(public payload: string) {}
}

export type Actions
  = ConnectAction;
