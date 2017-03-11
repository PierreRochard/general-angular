import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';
import {go} from "@ngrx/router-store";

import * as fromRoot from '../app.reducers';

@Injectable()
export class ApiUrlGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  hasApiUrlInStore(): Observable<boolean> {
    return this.store.select(fromRoot.getApiUrl)
      .map(apiUrl => {
        return !!apiUrl
      })
      .take(1);
  }

  hasApiUrl(): Observable<boolean> {
    return this.hasApiUrlInStore()
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        this.store.dispatch(go(['/']));
        return of(false);
      });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasApiUrl();
  }
}
