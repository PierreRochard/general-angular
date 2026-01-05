import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { receivedResponse } from '../rest/rest.actions';

import {
  addToken,
  removeToken,
  sendLoginPostRequest,
} from './auth.actions';
import { AuthService } from './auth.service';
import { getMenubar } from '../menubar/menubar.actions';
import { go } from '../router/router.actions';
import { PostLoginRequestPayload } from './auth.models';


@Injectable()
export class AuthEffects {

  sendPostRequest$ = createEffect(() => this.actions$.pipe(
    ofType(sendLoginPostRequest),
    map(action => action.payload),
    switchMap((payload: PostLoginRequestPayload) => {
      return this.authService.post_login(payload.schemaName, payload.formName, payload.data).pipe(
        map((response: any) => {
          const token = response.body[0]['token'];
          return addToken({ token });
        }),
        catchError(error => {
          return of(receivedResponse({ response: error }));
        }),
      );
    })));

  addToken$ = createEffect(() => this.actions$.pipe(
    ofType(addToken),
    switchMap(() => [
      go({ path: ['/'] }),
      getMenubar(),
    ])));

  removeToken$ = createEffect(() => this.actions$.pipe(
    ofType(removeToken),
    switchMap(() => [
      go({ path: ['/'] }),
      getMenubar(),
    ])));

  constructor(private actions$: Actions,
              private authService: AuthService, ) {
  }
}
