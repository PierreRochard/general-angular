import { Action } from '@ngrx/store';

import { type } from '../util';

export const SchemaActionTypes = {
  INVALIDATE_SCHEMA:   type('INVALIDATE_SCHEMA'),
  UPDATE_SCHEMA:       type('UPDATE_SCHEMA'),
  SELECT_PATH:         type('SELECT_PATH'),
};

export class InvalidateAction implements Action {
  type = SchemaActionTypes.INVALIDATE_SCHEMA;
  constructor(public payload) {}
}
export class UpdateSchemaAction implements Action {
  type = SchemaActionTypes.UPDATE_SCHEMA;
  constructor(public payload) {}
}
export class SelectPathAction implements Action {
  type = SchemaActionTypes.SELECT_PATH;
  constructor(public payload: string) {}
}

export type SchemaActions
  = InvalidateAction
  | UpdateSchemaAction
  | SelectPathAction;
