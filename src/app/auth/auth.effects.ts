import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';

import { Actions, Effect } from '@ngrx/effects';

import { ReceivedResponseAction } from '../rest/rest.actions';

import {
  AddTokenAction,
  AuthActionTypes,
  SendLoginPostRequestAction,
} from './auth.actions';
import { AuthService } from './auth.service';
import { GetMenubarAction } from '../menubar/menubar.actions';
import { Go } from '../router/router.actions';
import { PostLoginRequestPayload } from './auth.models';


@Injectable()
export class AuthEffects {

  @Effect()
  sendPostRequest$ = this.actions$
    .ofType(AuthActionTypes.SEND_LOGIN_POST_REQUEST)
    .map((action: SendLoginPostRequestAction) => action.payload)
    .switchMap((payload: PostLoginRequestPayload) => {
      return this.authService.post_login(payload.schemaName, payload.formName, payload.data)
        .map((response: any) => {
          const token = response.body[0]['token'];
          return new AddTokenAction(token);
        })
        .catch(error => {
          return of(new ReceivedResponseAction(error));
        });
    });

  @Effect()
  addToken$ = this.actions$
    .ofType(AuthActionTypes.ADD_TOKEN)
    .switchMap(() => [
      new Go({path: ['/']}),
      new GetMenubarAction()]);

  @Effect()
  removeToken$ = this.actions$
    .ofType(AuthActionTypes.REMOVE_TOKEN)
    .switchMap(() => [
      new Go({path: ['/']}),
      new GetMenubarAction()]);

  constructor(private actions$: Actions,
              private authService: AuthService, ) {
  }
}
