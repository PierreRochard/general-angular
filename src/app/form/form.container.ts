import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {SendPostRequestAction} from '../rest/rest.actions';

import {AppState} from '../app.reducers';
import {FormFieldSetting} from './form.models';
import {GetFormFieldSettingsAction} from "./form.actions";
import {SendLoginPostRequestAction} from "../auth/auth.actions";


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
  public selectedPathName$: Observable<string>;
  public formFieldSettings$: Observable<FormFieldSetting[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.formFieldSettings$ = Observable
      .combineLatest(this.selectedPathName$,
                     this.store.select(state => state.form.formFieldSettings),
                                  (pathName, formFieldSettings) => {
        const formName = pathName.split('/').pop();
        formFieldSettings = formFieldSettings.filter(fieldSetting => {
          return fieldSetting.form_name === formName;
        });
        if (formFieldSettings.length === 0 ) {
          this.store.dispatch(new GetFormFieldSettingsAction(formName))
        }
        return formFieldSettings
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
      }
      else {
        const postAction = new SendPostRequestAction(post);
        this.store.dispatch(postAction)
      }
    }
    );
  }
}
