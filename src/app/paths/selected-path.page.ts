import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../app.reducers';
import {Path, Property} from "../schema/schema.model";


@Component({
  selector: 'selected-path-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rpc-path
      [selectedPathName]="selectedPathName$ | async"
      [selectedPath]="selectedPath$ | async"
      [selectedPathPostBodyProperties]="selectedPathPostBodyProperties$ | async"
      [selectedPathPostBodyRequiredPropertyNames]="selectedPathPostBodyRequiredPropertyNames$ | async">
    </rpc-path>
  `
})
export class SelectedPathPageComponent {
  selectedPathName$: Observable<string>;
  selectedPath$: Observable<Path>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedPathName$ = store.select(fromRoot.getSelectedPathName);
    this.selectedPath$ = store.select(fromRoot.getSelectedPath);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getselectedPathPostBodyRequiredPropertyNames);
  }
}
