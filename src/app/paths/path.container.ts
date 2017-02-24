import {Component} from '@angular/core';

import {Store} from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';

import * as fromRoot from '../app.reducers';
import {Observable} from "rxjs";


@Component({
  selector: 'path-container',
  template: `
    <div [ngSwitch]="routeUrlLength$ | async">
      <home-container *ngSwitchCase="0" ></home-container>
      <table-container *ngSwitchCase="1" ></table-container>
      <rpc-container *ngSwitchCase="2" ></rpc-container>
    </div>
  `
})
export class PathContainer {
  routeUrlLength$: Observable<number>;

  constructor(store: Store<fromRoot.State>) {
    this.routeUrlLength$ = store.select(fromRoot.getSelectedPath)
                                .map(path => path.split('/').filter(part => part.length > 0).length)
  }
}
