import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import * as auth from './auth.actions'
import * as schema from '../schema/schema.actions';
import * as fromRoot from '../app.reducers';
import {RestClient} from "../common/rest-client.service";
import {Observable} from "rxjs";
import {of} from "rxjs/observable/of";
import {Store} from "@ngrx/store";
import {Response} from "@angular/http";

@Injectable()
export class RpcEffects {
  constructor(private actions$: Actions,
              private http: RestClient,
              private store: Store<fromRoot.State>,) {
  }

  @Effect()
  submitForm$ = this.actions$
    .ofType(auth.ActionTypes.REMOVE_TOKEN)
    .switchMap(action => [new schema.InvalidateAction()]);
}
