import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as rest from '../rest/rest.actions';
import * as schema from './schema.actions';
import {routerActions} from '@ngrx/router-store';

@Injectable()
export class SchemaEffects {
  constructor(private actions$: Actions) {
  }

  @Effect()
  invalidateSchema$ = this.actions$
    .ofType(schema.ActionTypes.INVALIDATE_SCHEMA)
    .switchMap(action => [new rest.SendGetRequestAction('/')]);

  // @Effect()
  // selectPath$ = this.actions$
  //   .ofType(routerActions.UPDATE_LOCATION)
  //   .switchMap(action => [new schema.selectPath(action.payload.path)]);
}
