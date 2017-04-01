import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  UPDATE_SCHEMA:       type('UPDATE_SCHEMA'),
  SELECT_PATH:         type('SELECT_PATH'),
};

export class InvalidateAction implements Action {
  type = ActionTypes.INVALIDATE_SCHEMA;
  constructor(public payload) {}
}
export class UpdateSchemaAction implements Action {
  type = ActionTypes.UPDATE_SCHEMA;
  constructor(public payload) {}
}
export class SelectPathAction implements Action {
  type = ActionTypes.SELECT_PATH;
  constructor(public payload: string) {}
}

export type Actions
  = InvalidateAction
  | UpdateSchemaAction
  | SelectPathAction;
