import {Actions, Effect} from "@ngrx/effects";


import {Response} from "@angular/http";
import {Injectable} from "@angular/core";
import * as schema from '../actions/schema.actions';
import {RestClient} from "angular2-postgrest";

@Injectable()
export class SchemaEffects {
  constructor (
    private actions$: Actions,
    private http: RestClient,
  ) { }

  @Effect() requestSchema$ = this.actions$
    .ofType(schema.ActionTypes.REQUEST_SCHEMA)
    .switchMap(action => (
      this.http.get('')
        .map(
          (response: Response) => {
            localStorage.setItem('paths', JSON.stringify(response.json().paths));
            localStorage.setItem('definitions', JSON.stringify(response.json().definitions));
            return true
          })
    ))

}
