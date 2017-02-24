import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as schema from './schema.actions';
import * as auth from '../auth/auth.actions'
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
    .switchMap(action => this.http.get('/')
          .map(response => new schema.ReceiveAction(response.json()))
    );

  @Effect()
  refreshSchema$ = this.actions$
    .ofType(schema.ActionTypes.INVALIDATE_SCHEMA)
    .switchMap(action => this.http.get('/')
      .map(response => new schema.ReceiveAction(response.json()))
    );

  @Effect()
  submitForm$ = this.actions$
    .ofType(schema.ActionTypes.SUBMIT_FORM)
    .switchMap(action => {
        let formData = action.payload;
        return this.http.post(formData.path, formData.properties)
          .map(response => {
            return new schema.ReceivePostAction(response.json())
          })
      }
    );

  @Effect()
  ProcessPostResponse$ = this.actions$
    .ofType(schema.ActionTypes.RECEIVE_POST)
    .switchMap(action => {
      let response = action.payload[0];
      if (response.hasOwnProperty('token')) {
        return [new auth.AddTokenAction(response.token),
          new schema.InvalidateAction()]
      } else {
        return []
      }
    });

}
