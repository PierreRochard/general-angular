import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../app.reducers';


@Component({
  selector: 'selected-path-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rpc-path
      [selectedPath]="selectedPath$ | async"
      [selectedPathPostBodyProperties]="selectedPathPostBodyProperties$ | async">
    </rpc-path>
  `
})
export class SelectedPathPageComponent {
  selectedPath$: Observable<any>;
  selectedPathPostBodyProperties$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedPath$ = store.select(fromRoot.getSelectedPath);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
  }
}
