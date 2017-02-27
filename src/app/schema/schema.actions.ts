import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  UPDATE_SCHEMA:       type('UPDATE_SCHEMA'),
};

export class InvalidateAction implements Action {
  type = ActionTypes.INVALIDATE_SCHEMA;
}
export class UpdateSchemaAction implements Action {
  type = ActionTypes.UPDATE_SCHEMA;
  constructor(public payload) {}
}

export type Actions
  = InvalidateAction
  | UpdateSchemaAction;
