import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { SendPostRequestAction } from '../rest/rest.actions';

import {AppState, getCurrentUrl} from '../app.reducers';
import { FormFieldSetting } from './form.models';
import {GetFormFieldSettingsAction, GetFormSettingsAction} from './form.actions'
import { RemoveTokenAction, SendLoginPostRequestAction } from '../auth/auth.actions';


@Component({
  selector: 'app-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-component
      [selectedPathName]="selectedPathName$ | async"
      [formSettings]="formSettings$ | async"
      [formFieldSettings]="formFieldSettings$ | async"
      (onSubmit)="onSubmit($event)">
    </app-form-component>`
})
export class FormContainer implements OnInit {
  public selectedPathName$: Observable<string>;
  public formFieldSettings$: Observable<FormFieldSetting[]>;
  public formSettings$: Observable<any>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.selectedPathName$ = this.store.select(getCurrentUrl);
    this.formFieldSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.form.fieldSettings),
        (pathName, allFormFieldSettings) => {
          const formName = pathName.split('/').pop();
          const formFieldSettings = allFormFieldSettings.filter(fieldSetting => {
            return fieldSetting.form_name === formName;
          });
          if (formFieldSettings.length === 0 && formName.toLowerCase() !== 'logout') {
            this.store.dispatch(new GetFormFieldSettingsAction(formName))
          } else if (formName.toLowerCase() === 'logout') {
            this.store.dispatch(new RemoveTokenAction(null))
          }
          return formFieldSettings
        });

    this.formSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.form.formSettings),
        (pathName, allFormSettings) => {
          const formName = pathName.split('/').pop();
          const formSettings = allFormSettings.filter(formSetting => {
            return formSetting.form_name === formName;
          });
          if (formSettings.length === 0 && formName.toLowerCase() !== 'logout') {
            this.store.dispatch(new GetFormSettingsAction(formName))
          } else if (formName.toLowerCase() === 'logout') {
            this.store.dispatch(new RemoveTokenAction(null))
          }
          return formSettings[0]
        })
  }

  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
      .map(key => delete formValue[key]);
    this.selectedPathName$.take(1).subscribe(selectedPathName => {
        const post = {
          path: selectedPathName,
          data: formValue
        };
        if (selectedPathName === '/rpc/login') {
          const postAction = new SendLoginPostRequestAction(post);
          this.store.dispatch(postAction)
        } else {
          const postAction = new SendPostRequestAction(post);
          this.store.dispatch(postAction)
        }
      }
    );
  }
}
