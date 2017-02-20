import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as schema from './schema.actions';
import {RestClient} from "../common/rest-client.service";

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

  @Effect()
  refreshSchema$ = this.actions$
    .ofType(schema.ActionTypes.INVALIDATE_SCHEMA)
    .switchMap(action => this.http.get('')
      .map(response => new schema.ReceiveAction(response.json()))
    )

}
