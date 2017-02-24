import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../app.reducers';
import * as schema from '../schema/schema.actions';
import {Observable} from "rxjs";


@Component({
  selector: 'view-path-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="routeUrlLength">
      <selected-rpc-path-container *ngSwitchCase="2" ></selected-rpc-path-container>
    </div>
  `
})
export class ViewPathPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  routeUrlLength: Observable<number>;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('pathName')
      .map(pathName => new schema.SelectPathNameAction('/rpc/'+ pathName))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
