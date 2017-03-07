import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as rest from '../rest/rest.actions';

import * as fromRoot from '../app.reducers';
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<form-component
                [selectedPathName]="selectedPathName$ | async"
                [selectedPath]="selectedPath$ | async"
                [selectedPathPostBodyProperties]="selectedPathPostBodyProperties$ | async"
                [selectedPathPostBodyRequiredPropertyNames]="selectedPathPostBodyRequiredPropertyNames$ | async"
                (onSubmit)="onSubmit($event)">
              </form-component>`
})
export class FormContainer {
  selectedPathName$: Observable<string>;
  selectedPath$: Observable<Path>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedPathName$ = store.select(fromRoot.routerPath);
    this.selectedPath$ = store.select(fromRoot.getSelectedPath);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames);
  }
  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
                          .map(key=> delete formValue[key]);
    console.log(formValue);
    this.store.select(fromRoot.routerPath).take(1)
      .map(routerPath => this.store.dispatch(new rest.SendPostRequestAction(formValue)))
  }
}
