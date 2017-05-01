import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';

import {RestClient} from '../rest/rest.service';

import * as fromRoot from '../app.reducers';
import * as schema from './schema.actions';
import * as rest from '../rest/rest.actions';
import {go} from "@ngrx/router-store";

@Injectable()
export class SchemaGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.AppState>,
    private http: RestClient,
  ) { }

  getSchema(): Observable<boolean> {
    return this.http.get('/')
      .map(response => new schema.UpdateSchemaAction(response.json()))
      .do((action: schema.UpdateSchemaAction) => this.store.dispatch(action))
      .map(schema => {
        return !!schema
      })
      .catch(error => {
        this.store.dispatch(new rest.ReceivedResponseAction(error));
        return Observable.of(true);
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
    console.log('here');
    return this.hasSchema();
  }
}
