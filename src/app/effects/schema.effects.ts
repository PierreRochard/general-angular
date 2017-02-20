import 'rxjs';

import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import * as schema from '../actions/schema.actions';
import {RestClient} from "../services/rest-client.service";

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
