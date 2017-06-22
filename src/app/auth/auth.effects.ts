import {Injectable} from '@angular/core';

import {of} from 'rxjs/observable/of';

import {Actions, Effect} from '@ngrx/effects';
import {go} from '@ngrx/router-store';

import {ReceivedResponseAction} from '../rest/rest.actions';

import {AddTokenAction, AuthActionTypes} from './auth.actions';
import {AuthService} from './auth.service';
import { GetMenubarAction } from '../menubar/menubar.actions';


@Injectable()
export class AuthEffects {

  @Effect()
  sendPostRequest$ = this.actions$
    .ofType(AuthActionTypes.SEND_LOGIN_POST_REQUEST)
    .switchMap(action => {
      return this.authService.post_login(action.payload.path, action.payload.data)
        .map(response => {
          const token = response.json()[0].token;
          return new AddTokenAction(token);
        })
        .catch(error => {
          return of(new ReceivedResponseAction(error));
        });
    });

  @Effect()
  addToken$ = this.actions$
    .ofType(AuthActionTypes.ADD_TOKEN)
    .switchMap(action => [go(['/']), new GetMenubarAction(null)]);

  @Effect()
  removeToken$ = this.actions$
    .ofType(AuthActionTypes.REMOVE_TOKEN)
    .switchMap(action => [go(['/']), new GetMenubarAction(null)]);

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
