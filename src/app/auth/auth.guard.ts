import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';

import * as fromRoot from '../app.reducers';
import {go} from "@ngrx/router-store";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.AppState>,
  ) { }

  getPaths(): Observable<string[]> {
    return this.store.select(fromRoot.getSchemaState)
      .map(schemaState => {
        console.log(schemaState);
        return Object.keys(schemaState.paths)
      });
  }

  hasPath(): Observable<boolean> {
    return this.getPaths()
      .withLatestFrom(this.store)
      .filter(([paths, store]) => paths.length > 0)
      .switchMap(([paths, store]) => {
        console.log(paths);
        console.log(store.router.path);
        return of(paths.includes(`/${store.router.path}`))
      });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasPath()
  }
}
