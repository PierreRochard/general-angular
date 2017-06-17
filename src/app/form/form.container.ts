import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {SendPostRequestAction} from '../rest/rest.actions';

import {AppState, getSchemaState} from '../app.reducers';
import {FormFieldSetting} from './form.models';
import {GetFormFieldSettingsAction} from "./form.actions";


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
    this.formFieldSettings$ = Observable
      .combineLatest(this.selectedPathName$,
                     this.store.select(state => state.form.formFieldSettings),
                                  (pathName, fieldSettings) => {
        const formName = pathName.split('/').pop();
        const formFieldSettings = fieldSettings.filter(fieldSetting => {
          return fieldSetting.form_name === formName;
        });
        if (formFieldSettings.length === 0 ) {
          this.store.dispatch(new GetFormFieldSettingsAction(formName))
        }
        return formFieldSettings
      })
  }

  public onSubmit(formValue: any) {
    console.log(formValue);
    Object.keys(formValue).filter(key => formValue[key] === '')
                          .map(key => delete formValue[key]);
    this.selectedPathName$.take(1).subscribe(selectedPathName => {
      const post = {
        path: selectedPathName,
        data: formValue
      };
      const postAction = new SendPostRequestAction(post);
      this.store.dispatch(postAction)
    }
    );
  }
}
