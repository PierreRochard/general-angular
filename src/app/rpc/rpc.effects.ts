import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as auth from '../auth/auth.actions'
import * as rpc from './rpc.actions';
import * as schema from '../schema/schema.actions';
import * as fromRoot from '../app.reducers';
import {RestClient} from "../common/rest-client.service";
import {Observable} from "rxjs";
import {of} from "rxjs/observable/of";
import {Store} from "@ngrx/store";
import {Response} from "@angular/http";

@Injectable()
export class RpcEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.State>,
  ) { }
  @Effect()
  submitForm$ = this.actions$
    .ofType(rpc.ActionTypes.SUBMIT_FORM)
    .switchMap(action => {
      return this.store.select(fromRoot.getSelectedPathName)
        .switchMap(pathName => {
        return this.http.post(pathName, action.payload)
          .map(response => {
            return new rpc.ReceivePostAction(response)
          })
          .catch(error => {
            return of(new rpc.ReceivePostAction(error));
          })
      })
    });

  @Effect()
  ProcessPostResponse$ = this.actions$
    .ofType(rpc.ActionTypes.RECEIVE_POST)
    .switchMap(action => {
      let response: Response = action.payload;
      console.log(action.payload);
      switch (response.status) {
        case 403: {
          return []
        }
        case 401: {
          return []
        }
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
