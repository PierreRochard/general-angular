import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  POPULATE_RECORDS:   type('POPULATE_RECORDS'),
};

export class PopulateRecordsAction implements Action {
  type = ActionTypes.POPULATE_RECORDS;
  constructor(public payload) {}
}

export type Actions
  = PopulateRecordsAction;
