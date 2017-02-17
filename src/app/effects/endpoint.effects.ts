import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {RestClient} from "angular2-postgrest";

import * as schema from '../actions/schema.actions';
import * as endpoint from '../actions/endpoint.actions';
import * as fromRoot from '../reducers';
import {Endpoint} from "../models/endpoint.model";

@Injectable()
export class EndpointEffects {
  schema$: Observable<any>;
  constructor (
    private actions$: Actions,
    private http: RestClient,
    private store: Store<fromRoot.State>,
  ) {
    this.schema$ = store.select(fromRoot.getSchema);
  }

  @Effect()
  requestSchema$ = this.actions$
    .ofType(schema.ActionTypes.RECEIVE_SCHEMA)
    .switchMap(action =>
        this.schema$.map(schema =>
          new endpoint.AddAction(schema.definitions)
        )
    );
}
