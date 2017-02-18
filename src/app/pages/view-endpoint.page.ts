import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as endpoint from '../actions/endpoint.actions';


@Component({
  selector: 'view-endpoint-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <selected-endpoint-page></selected-endpoint-page>
  `
})
export class ViewEndpointPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('endpointName')
      .map(endpoint_name => new endpoint.SelectAction(endpoint_name))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
