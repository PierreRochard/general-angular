import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';

import { Observable } from "rxjs";
import {of} from "rxjs/observable/of";

import {Store} from "@ngrx/store";

import {RestClient} from "angular2-postgrest";

import * as fromRoot from '../reducers';
import * as schema from '../actions/schema.actions';

@Injectable()
export class SchemaGuard implements CanActivate {
  private schema$:Observable<any>;
  constructor(
    private store: Store<fromRoot.State>,
    private http: RestClient,
    private router: Router,
  ) {
    this.schema$ = store.select(fromRoot.getSchema);
  }

  getSchema(): Observable<boolean> {
    return this.http.get('')
      .map(response => new schema.ReceiveAction(response.json()))
      .do((action: schema.ReceiveAction) => this.store.dispatch(action))
      .map(schema => {
        console.log(schema);
        return !!schema
      })
      .catch(() => {
        this.router.navigate(['/404']);
        return of(false);
      });
  }

  hasSchemaInStore(): Observable<boolean> {
    return this.store.select(fromRoot.getSchema)
      .map(schema => {
        return Object.keys(schema).length === 0 && schema.constructor === Object
      })
      .take(1);
  }

  hasSchema(): Observable<boolean> {
    return this.hasSchemaInStore()
      .switchMap(inStore => {
        console.log(inStore);
        if (inStore) {
          return of(inStore);
        }
        return this.getSchema();
      });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasSchema();
  }
}
