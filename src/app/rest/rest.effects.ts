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
import {Store, Action} from "@ngrx/store";
import {Response} from "@angular/http";

@Injectable()
export class RestEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.State>,
  ) { }

  @Effect()
  sendGetRequest = this.actions$
    .ofType(rest.ActionTypes.SEND_GET_REQUEST,
            schema.ActionTypes.INVALIDATE_SCHEMA,
            auth.ActionTypes.ADD_APIURL)
    .switchMap(action => this.http.get('/')
      .mergeMap(response => {
        return [
          new rest.ReceivedResponseAction(response),
      ]
      })
      .catch(error => {
        return of(new rest.ReceivedResponseAction(error));
      })
    );

  @Effect()
  sendPostRequest$ = this.actions$
    .ofType(rest.ActionTypes.SEND_POST_REQUEST)
    .withLatestFrom(this.store)
    .switchMap(([action, store]) => {
      let data = action.payload;
      return this.http.post(store.router.path, action.payload)
          .map(response => {
            return new rest.ReceivedResponseAction(response)
          })
          .catch(error => {
            return of(new rest.ReceivedResponseAction(error));
          })
    });

  @Effect()
  processResponse$ = this.actions$
    .ofType(rest.ActionTypes.RECEIVED_RESPONSE)
    .switchMap((action: Action): Action[] => {
      let response: Response = action.payload;
      switch (response.status) {
        case 200: {
          let responseJSON = action.payload.json();
          if (responseJSON.hasOwnProperty('swagger')) {
            return [new schema.UpdateSchemaAction(responseJSON), ]
          }
          responseJSON = action.payload.json()[0];
          if (responseJSON.hasOwnProperty('token')) {
            return [new auth.AddTokenAction(responseJSON.token),
                    new schema.InvalidateAction()]
          } else {
            return []
          }
        }
        case 401: {
          if (response.json().message === 'JWT expired') {
            return [new auth.RemoveTokenAction(), ]
          } else {
            console.log(response);
            return []
          }
        }
        default: {
          return []
        }
      }
    });

}
