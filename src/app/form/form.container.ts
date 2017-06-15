import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {SendPostRequestAction} from '../rest/rest.actions';

import {AppState, getSchemaState} from '../app.reducers';
import {FormFieldSetting} from './form.models';


@Component({
  selector: 'app-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-component
      [selectedPathName]="selectedPathName$ | async"
      [formFieldSettings]="formFieldSettings$ | async"
      (onSubmit)="onSubmit($event)">
    </app-form-component>`
})
export class FormContainer implements OnInit {
  selectedPathName$: Observable<string>;
  formFieldSettings$: Observable<FormFieldSetting[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.formFieldSettings$ = this.store.select(state => state.form.formFieldSettings);
  }

  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
                          .map(key => delete formValue[key]);
    this.store.select(getSchemaState).take(1)
      .subscribe(schemaState => this.store.dispatch(
        new SendPostRequestAction({path: schemaState.selectedPathName, data: formValue}))
      );
  }
}
