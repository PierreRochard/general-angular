import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import 'rxjs/add/operator/withLatestFrom';

import {AddTokenAction, RemoveTokenAction} from '../auth/auth.actions';
import {ReceivedResponseAction, RestActionTypes} from './rest.actions';
import {UpdateSchemaAction} from '../schema/schema.actions';
import {InitializeRecordsAction} from '../table/table.actions';
import {AppState} from '../app.reducers';
import {RestClient} from './rest.service';

import {of} from 'rxjs/observable/of';
import {Store, Action} from '@ngrx/store';
import {Response} from '@angular/http';
import {go} from '@ngrx/router-store';

@Injectable()
export class RestEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(RestActionTypes.SEND_GET_REQUEST)
    .switchMap(action => this.http.get(action.payload.path)
      .mergeMap(response => {
        return [
          new ReceivedResponseAction(response),
      ];
      })
      .catch(error => {
        return of(new ReceivedResponseAction(error));
      })
    );

  @Effect()
  sendPostRequest$ = this.actions$
    .ofType(RestActionTypes.SEND_POST_REQUEST)
    .switchMap(action => {
      return this.http.post(action.payload.path, action.payload.data)
          .map(response => {
            return new ReceivedResponseAction(response);
          })
          .catch(error => {
            return of(new ReceivedResponseAction(error));
          });
    });

  @Effect()
  sendDeleteRequest$ = this.actions$
    .ofType(RestActionTypes.SEND_DELETE_REQUEST)
    .withLatestFrom(this.store)
    .switchMap(([action, store]) => {
      return this.http.delete(store.router.path, action.payload)
        .map(response => {
          return new ReceivedResponseAction(response);
        })
        .catch(error => {
          return of(new ReceivedResponseAction(error));
        });
    });

  @Effect()
  processResponse$ = this.actions$
    .ofType(RestActionTypes.RECEIVED_RESPONSE)
    .withLatestFrom(this.store)
    .switchMap(([action, store]): Action[] => {
      let response_url: any;
      let response_data: any | Promise<any>;
      const response: Response = action.payload;
      switch (response.status) {
        case 200:
          response_data = action.payload.json();
          response_url = action.payload.url;
          if (response_url === 'https://api.rochard.org/') {
            return [new UpdateSchemaAction(response_data)];
          } else if (response_url === 'https://api.rochard.org/rpc/login') {
            return [new AddTokenAction(response_data[0].token)];
          } else {
            return [new InitializeRecordsAction(response_data)];
          }
        case 204:
          return [];
        case 401:
          if (response.json().message === 'JWT expired') {
            return [new RemoveTokenAction(''), go(['/rpc/login'])];
          } else {
            return [];
          }
        default:
          return [];
      }
    });

  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<AppState>,
  ) { }
}
