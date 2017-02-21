import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";


import * as schema from './schema.actions';
import * as endpoint from './endpoint.actions';
import * as auth from '../auth/auth.actions'
import {RestClient} from "../common/rest-client.service";

@Injectable()
export class EndpointEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
  ) {
  }


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
