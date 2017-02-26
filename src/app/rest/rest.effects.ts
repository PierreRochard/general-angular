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
  submitForm$ = this.actions$
    .ofType(rest.ActionTypes.SUBMIT_FORM)
    .withLatestFrom(this.store)
    .switchMap(([action, store]) => {
      return this.http.post(store.router.path, action.payload)
          .map(response => {
            return new rest.ReceivePostAction(response)
          })
          .catch(error => {
            return of(new rest.ReceivePostAction(error));
          })
    });

  @Effect()
  ProcessPostResponse$ = this.actions$
    .ofType(rest.ActionTypes.RECEIVE_POST)
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
