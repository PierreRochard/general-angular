import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';


@Component({
  selector: 'selected-endpoint-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <endpoint-detail
      [endpointProperties]="endpointProperties$ | async"
    </endpoint-detail>
  `
})
export class SelectedEndpointPageComponent {
  endpointProperties$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.endpointProperties$ = store.select(fromRoot.getEndpointProperties);
  }
}
