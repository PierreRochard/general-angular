import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';

import { Observable } from "rxjs";
import {of} from "rxjs/observable/of";

import {Store} from "@ngrx/store";

import {RestClient} from "../services/rest-client.service";

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
        return !!schema
      });
  }

  hasSchemaInStore(): Observable<boolean> {
    return this.store.select(fromRoot.getStatus)
      .map(status => {
        return status
      })
      .take(1);
  }

  hasSchema(): Observable<boolean> {
    return this.hasSchemaInStore()
      .switchMap(inStore => {
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
