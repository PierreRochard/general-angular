import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { addToken, removeToken } from '../auth/auth.actions';
import { go } from '../router/router.actions';
import { receivedResponse, sendGetRequest, sendPostRequest } from './rest.actions';
import { RestClient } from './rest.service';

@Injectable()
export class RestEffects {

  sendGetRequest$ = createEffect(() => this.actions$.pipe(
    ofType(sendGetRequest),
    switchMap(action => this.http
      .get(action.schema, action.path)
      .pipe(
        mergeMap((response: any) => {
          return [
            receivedResponse({ response }),
          ];
        }),
        catchError((error: any) => of(receivedResponse({ response: error }))),
      ))));

  sendPostRequest$ = createEffect(() => this.actions$.pipe(
    ofType(sendPostRequest),
    switchMap((action) => {
      const endpoint = `/rpc/${action.formName}`;
      return this.http.post(action.schemaName,
        endpoint,
        action.data).pipe(
        map((response: any) => {
          return receivedResponse({ response });
        }),
        catchError((error: any) => {
          return of(receivedResponse({ response: error }));
        }));
    })));

  processResponse$ = createEffect(() => this.actions$.pipe(
    ofType(receivedResponse),
    map(action => action.response),
    switchMap((response): any[] => {
      let response_url: any;
      let response_data: any | Promise<any>;
      switch (response.status) {
        case 200:
          response_data = response.body;
          response_url = response.url;
          if (response_url === 'https://api.rochard.org/rpc/login') {
            return [addToken({ token: response_data[0].token })];
          }
          return [];
        case 204:
          return [];
        case 401:
          if (response.message === 'JWT expired') {
            return [
              removeToken(),
              go({ path: ['/rpc/login'] }),
            ];
          } else {
            return [];
          }
        default:
          return [];
      }
    })));

  constructor(private actions$: Actions,
              private http: RestClient, ) {
  }
}
