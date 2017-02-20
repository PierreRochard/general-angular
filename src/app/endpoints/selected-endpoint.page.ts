import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../app.reducers';


@Component({
  selector: 'selected-endpoint-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rpc-endpoint
      [selectedEndpoint]="selectedEndpoint$ | async"
      [selectedEndpointProperties]="selectedEndpointProperties$ | async">
    </rpc-endpoint>
  `
})
export class SelectedEndpointPageComponent {
  selectedEndpoint$: Observable<any>;
  selectedEndpointProperties$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedEndpoint$ = store.select(fromRoot.getSelectedEndpoint);
    this.selectedEndpointProperties$ = store.select(fromRoot.getSelectedEndpointProperties);
  }
}
