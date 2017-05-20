import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

import {Store} from '@ngrx/store';

import {RestClient} from '../rest/rest.service';

import {AppState, getIsValid} from '../app.reducers';
import {ReceiveMenubarAction} from './menubar.actions';
import {ReceivedResponseAction} from '../rest/rest.actions';

@Injectable()
export class MenubarGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private http: RestClient,
  ) { }

  getMenubar(): Observable<boolean> {
    return this.http.get('/')
      .map(response => new ReceiveMenubarAction(response.json()))
      .do((action: ReceiveMenubarAction) => this.store.dispatch(action))
      .map(menubar => {
        return !!menubar;
      })
      .catch(error => {
        this.store.dispatch(new ReceivedResponseAction(error));
        return Observable.of(true);
      });
  }

  hasMenubarInStore(): Observable<boolean> {
    return this.store.select(getIsValid)
      .map(status => {
        return status;
      })
      .take(1);
  }

  hasMenubar(): Observable<boolean> {
    return this.hasMenubarInStore()
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.getMenubar();
      });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasMenubar();
  }
}
