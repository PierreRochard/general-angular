import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../app.reducers';
import * as schema from '../schema/schema.actions';


@Component({
  selector: 'view-path-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <selected-path-page></selected-path-page>
  `
})
export class ViewPathPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('pathName')
      .map(pathName => new schema.SelectAction(pathName))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
