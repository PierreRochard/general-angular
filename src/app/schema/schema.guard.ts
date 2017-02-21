import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';

import {RestClient} from '../common/rest-client.service';

import * as fromRoot from '../app.reducers';
import * as schema from './schema.actions';

@Injectable()
export class SchemaGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private http: RestClient,
  ) { }

  getSchema(): Observable<boolean> {
    return this.http.get('')
      .map(response => new schema.ReceiveAction(response.json()))
      .do((action: schema.ReceiveAction) => this.store.dispatch(action))
      .map(schema => {
        return !!schema
      });
  }

  hasSchemaInStore(): Observable<boolean> {
    return this.store.select(fromRoot.getIsValid)
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
