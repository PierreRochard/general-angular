import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';

import {RestClient} from '../rest/rest.service';

import {AppState, getIsValid} from '../app.reducers';
import {UpdateSchemaAction} from './schema.actions';
import {ReceivedResponseAction} from '../rest/rest.actions';

@Injectable()
export class SchemaGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private http: RestClient,
  ) { }

  // getSchema(): Observable<boolean> {
  //   return this.http.get('/')
  //     .map(response => new UpdateSchemaAction(response.json()))
  //     .do((action: UpdateSchemaAction) => this.store.dispatch(action))
  //     .map(schema => {
  //       return !!schema;
  //     })
  //     .catch(error => {
  //       this.store.dispatch(new ReceivedResponseAction(error));
  //       return Observable.of(true);
  //     });
  // }
  //
  // hasSchemaInStore(): Observable<boolean> {
  //   return this.store.select(getIsValid)
  //     .map(status => {
  //       return status;
  //     })
  //     .take(1);
  // }
  //
  // hasSchema(): Observable<boolean> {
  //   return this.hasSchemaInStore()
  //     .switchMap(inStore => {
  //       if (inStore) {
  //         return of(inStore);
  //       }
  //       return this.getSchema();
  //     });
  // }

  canActivate(route: ActivatedRouteSnapshot) {
    // return this.hasSchema();
    return true;
  }
}
