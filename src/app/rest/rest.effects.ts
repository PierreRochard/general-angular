import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';
import 'rxjs/add/operator/withLatestFrom';

import * as auth from '../auth/auth.actions'
import * as rest from './rest.actions';
import * as schema from '../schema/schema.actions';
import * as table from '../table/table.actions';
import * as fromRoot from '../app.reducers';
import {RestClient} from "./rest.service";

import {of} from "rxjs/observable/of";
import {Store, Action} from "@ngrx/store";
import {Response} from "@angular/http";
import {go} from "@ngrx/router-store";

@Injectable()
export class RestEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.AppState>,
  ) { }

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(rest.ActionTypes.SEND_GET_REQUEST)
    .switchMap(action => this.http.get(action.payload.path)
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
    .switchMap(action => {
      return this.http.post(action.payload.path, action.payload.data)
          .map(response => {
            return new rest.ReceivedResponseAction(response)
          })
          .catch(error => {
            return of(new rest.ReceivedResponseAction(error));
          })
    });

  @Effect()
  sendDeleteRequest$ = this.actions$
    .ofType(rest.ActionTypes.SEND_DELETE_REQUEST)
    .withLatestFrom(this.store)
    .switchMap(([action, store]) => {
      return this.http.delete(store.router.path, action.payload)
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
    .withLatestFrom(this.store)
    .switchMap(([action, store]): Action[] => {
      let response: Response = action.payload;
      switch (response.status) {
        case 200: {
          let response_data = action.payload.json();
          let response_url = action.payload.url;
          if (response_url === 'https://api.rochard.org/') {
            return [new schema.UpdateSchemaAction(response_data)]
          } else if (response_url === 'https://api.rochard.org/rpc/login') {
            return [new auth.AddTokenAction(response_data[0].token)]
          } else {
            return [new table.InitializeRecordsAction(response_data)]
          }
        }
        case 204: {
          return []
        }
        case 401: {
          if (response.json().message === 'JWT expired') {
            return [new auth.RemoveTokenAction(''), go(['/rpc/login'])]
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
