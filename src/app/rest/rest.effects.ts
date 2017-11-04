import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import {
  AddTokenAction, RemoveTokenAction,
} from '../auth/auth.actions';
import {
  ReceivedResponseAction, RestActionTypes,
  SendGetRequestAction, SendPostRequestAction,
} from './rest.actions';
import { RestClient } from './rest.service';

import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Go } from '../router/router.actions';

@Injectable()
export class RestEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(RestActionTypes.SEND_GET_REQUEST)
    .switchMap((action: SendGetRequestAction) => this.http
      .get(action.payload.schema,
        action.payload.path)
      .mergeMap(response => {
        return [
          new ReceivedResponseAction(response),
        ];
      })
      .catch(error => {
        return of(new ReceivedResponseAction(error));
      }),
    );

  @Effect()
  sendPostRequest$ = this.actions$
    .ofType(RestActionTypes.SEND_POST_REQUEST)
    .switchMap((action: SendPostRequestAction) => {
      return this.http.post(action.payload.schema,
        action.payload.path,
        action.payload.data)
        .map(response => {
          return new ReceivedResponseAction(response);
        })
        .catch(error => {
          return of(new ReceivedResponseAction(error));
        });
    });

  // Fix route store selector getCurrentUrl
  // @Effect()
  // sendDeleteRequest$ = this.actions$
  //   .ofType(RestActionTypes.SEND_DELETE_REQUEST)
  //   .map((action: SendDeleteRequestAction) => action)
  //   .withLatestFrom(this.store)
  //   .switchMap(([action, store]) => {
  //     console.log(store.router.state.root);
  //     return this.http.delete(store.router.state.root, action.payload)
  //       .map(response => {
  //         return new ReceivedResponseAction(response);
  //       })
  //       .catch(error => {
  //         return of(new ReceivedResponseAction(error));
  //       });
  //   });

  @Effect()
  processResponse$ = this.actions$
    .ofType(RestActionTypes.RECEIVED_RESPONSE)
    .map((action: ReceivedResponseAction) => action)
    .switchMap((action): Action[] => {
      let response_url: any;
      let response_data: any | Promise<any>;
      const response: any = action.payload;
      switch (response.status) {
        case 200:
          response_data = action.payload.body;
          response_url = action.payload.url;
          if (response_url === 'https://api.rochard.org/rpc/login') {
            return [new AddTokenAction(response_data[0].token)];
          }
          return [];
        case 204:
          return [];
        case 401:
          if (response.message === 'JWT expired') {
            return [
              new RemoveTokenAction(''),
              new Go({path: ['/rpc/login']}),
            ];
          } else {
            return [];
          }
        default:
          return [];
      }
    });

  constructor(private actions$: Actions,
              private http: RestClient, ) {
  }
}
