import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {SendGetRequestAction} from '../rest/rest.actions';
import {SchemaActionTypes, SelectPathAction} from './schema.actions';

@Injectable()
export class SchemaEffects {

  @Effect()
  invalidateSchema$ = this.actions$
    .ofType(SchemaActionTypes.INVALIDATE_SCHEMA)
    .switchMap(action => [new SendGetRequestAction({path: '/'})]);

  // @Effect()
  // selectPath$ = this.actions$
  //   .ofType(routerActions.UPDATE_LOCATION)
  //   .switchMap(action => [new SelectPathAction(action.payload.path)]);

  constructor(private actions$: Actions) {}

}
