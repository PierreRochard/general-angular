import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as rpc from './rpc.actions';

import * as fromRoot from '../app.reducers';
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'rpc-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<h1>
  {{selectedPathName$ | async}}
</h1>
<form-component
      [selectedPathName]="selectedPathName$ | async"
      [selectedPathPostBodyProperties]="selectedPathPostBodyProperties$ | async"
      [selectedPathPostBodyRequiredPropertyNames]="selectedPathPostBodyRequiredPropertyNames$ | async"
      (onSubmit)="onSubmit($event)">
    </form-component>
  `
})
export class RpcContainer {
  selectedPathName$: Observable<string>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedPathName$ = store.select(fromRoot.getSelectedPathName);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames);
  }
  public onSubmit(formValue: any) {
    console.log('ONSUBMIT FORM');
    this.store.dispatch(new rpc.SubmitFormAction(formValue));
  }
}
