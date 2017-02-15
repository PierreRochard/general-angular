import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import {RestClient} from "angular2-postgrest";

import * as schema from '../actions/schema.actions';

@Injectable()
export class SchemaEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
  ) { }

  @Effect()
  requestSchema$ = this.actions$
    .ofType(schema.ActionTypes.REQUEST_SCHEMA)
    .switchMap(action => this.http.get('')
          .map(response => new schema.ReceiveAction(response.json()))
    );
}
