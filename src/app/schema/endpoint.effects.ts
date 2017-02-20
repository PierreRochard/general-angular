import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";


import * as schema from './schema.actions';
import * as endpoint from './endpoint.actions';
import * as auth from '../auth/auth.actions'
import * as fromRoot from '../app.reducers';
import {RestClient} from "../common/rest-client.service";

@Injectable()
export class EndpointEffects {
  schema$: Observable<any>;
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.State>,
  ) {
    this.schema$ = store.select(fromRoot.getSchema);
  }

  @Effect()
  addEndpoints$ = this.actions$
    .ofType(schema.ActionTypes.RECEIVE_SCHEMA)
    .switchMap(action =>
        this.schema$.map(schema =>
          new endpoint.AddEndpointsAction(schema.definitions)
        )
    );

  @Effect()
  addProperties$ = this.actions$
    .ofType(endpoint.ActionTypes.ADD_ENDPOINTS)
    .switchMap(action =>
      this.schema$.map(schema =>
        new endpoint.AddPropertiesAction(schema.definitions)
      )
    );

  @Effect()
  submitForm$ = this.actions$
    .ofType(endpoint.ActionTypes.SUBMIT_FORM)
    .switchMap(action => {
      let formData = action.payload;
      return this.http.post(formData.path, formData.properties)
        .map(response => {
          return new endpoint.ReceivePostAction(response.json())
        })
      }
    );

  @Effect()
  ProcessPostResponse$ = this.actions$
    .ofType(endpoint.ActionTypes.RECEIVE_POST)
    .switchMap(action => {
      let response = action.payload[0];
      if (response.hasOwnProperty('token')) {
        return [new auth.AddTokenAction(response.token),
                new schema.InvalidateAction()]
      } else {
        return []
      }
    })
}
