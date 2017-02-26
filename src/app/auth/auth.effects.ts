import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as auth from './auth.actions'
import * as schema from '../schema/schema.actions';
import * as fromRoot from '../app.reducers';
import {RestClient} from "../rest/rest.service";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private http: RestClient,
              private store: Store<fromRoot.State>,) {
  }

  @Effect()
  submitForm$ = this.actions$
    .ofType(auth.ActionTypes.REMOVE_TOKEN)
    .switchMap(action => [new schema.InvalidateAction()]);
}
