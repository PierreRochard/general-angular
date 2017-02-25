import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as rpc from './rpc.actions';

import * as fromRoot from '../app.reducers';
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'rpc-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<rpc-form
      [selectedPathName]="selectedPathName$ | async"
      [selectedPath]="selectedPath$ | async"
      [selectedPathPostBodyProperties]="selectedPathPostBodyProperties$ | async"
      [selectedPathPostBodyRequiredPropertyNames]="selectedPathPostBodyRequiredPropertyNames$ | async"
      (onSubmit)="onSubmit($event)">
    </rpc-form>
  `
})
export class RpcContainer {
  selectedPathName$: Observable<string>;
  selectedPath$: Observable<Path>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedPathName$ = store.select(fromRoot.getSelectedPathName);
    this.selectedPath$ = store.select(fromRoot.getSelectedPath);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames);
  }
  public onSubmit(formValue: any) {
    this.store.dispatch(new rpc.SubmitFormAction(formValue));
  }
}
