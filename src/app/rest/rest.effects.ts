import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';
import 'rxjs/add/operator/withLatestFrom';

import * as auth from '../auth/auth.actions'
import * as rest from './rest.actions';
import * as schema from '../schema/schema.actions';
import * as fromRoot from '../app.reducers';
import {RestClient} from "./rest.service";

import {of} from "rxjs/observable/of";
import {Store} from "@ngrx/store";
import {Response} from "@angular/http";

@Injectable()
export class RestEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.State>,
  ) { }

  @Effect()
  requestSchema$ = this.actions$
    .ofType(rest.ActionTypes.REQUEST_SCHEMA, schema.ActionTypes.INVALIDATE_SCHEMA)
    .switchMap(action => this.http.get('/')
      .mergeMap(response => {
        return [
          new rest.ReceivedSchemaAction(response),
          new schema.UpdateSchemaAction(response.json())
      ]
      })
    );

  @Effect()
  submitForm$ = this.actions$
    .ofType(rest.ActionTypes.SUBMIT_FORM)
    .withLatestFrom(this.store)
    .switchMap(([action, store]) => {
      return this.http.post(store.router.path, action.payload)
          .map(response => {
            return new rest.ReceivedPostResponseAction(response)
          })
          .catch(error => {
            return of(new rest.ReceivedPostResponseAction(error));
          })
    });

  @Effect()
  ProcessPostResponse$ = this.actions$
    .ofType(rest.ActionTypes.RECEIVED_POST_RESPONSE)
    .switchMap(action => {
      let response: Response = action.payload;
      switch (response.status) {
        case 200: {
          let responseBody = action.payload.json()[0];
          if (responseBody.hasOwnProperty('token')) {
            return [new auth.AddTokenAction(responseBody.token),
                    new schema.InvalidateAction()]
          } else {
            return []
          }
        }
        default: {
          return []
        }
      }
    });

}
