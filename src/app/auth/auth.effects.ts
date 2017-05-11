import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";
import {go} from "@ngrx/router-store";

import {AuthActionTypes} from './auth.actions'
import {InvalidateAction} from '../schema/schema.actions';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {
  }

  @Effect()
  addToken$ = this.actions$
    .ofType(AuthActionTypes.ADD_TOKEN)
    .switchMap(action => [new InvalidateAction(null), go(['/'])]);

  @Effect()
  removeToken$ = this.actions$
    .ofType(AuthActionTypes.REMOVE_TOKEN)
    .switchMap(action => [new InvalidateAction(null), go(['/'])]);
}
