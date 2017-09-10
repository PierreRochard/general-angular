import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { SendPostRequestAction } from '../rest/rest.actions';

import { AppState, getCurrentParams, getCurrentUrl } from '../app.reducers';
import { FormField } from './form.models';
import {
  GetFormFieldSettingsAction,
  GetFormSettingsAction,
} from './form.actions'
import {
  RemoveTokenAction,
  SendLoginPostRequestAction,
} from '../auth/auth.actions';
import { Go } from '../router/router.actions';
import { RouteParams } from '../router/router.models';


@Component({
  selector: 'app-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-component
      [selectedPathName]="selectedPathName$ | async"
      [formSettings]="formSettings$ | async"
      [formFieldSettings]="formFieldSettings$ | async"
      (onSubmit)="onSubmit($event)">
    </app-form-component>`,
})
export class FormContainer implements OnInit {
  public selectedPathName$: Observable<string>;
  public selectedRouteParams$: Observable<RouteParams>;
  public formFieldSettings$: Observable<FormField[]>;
  public formSettings$: Observable<any>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.selectedPathName$ = this.store.select(getCurrentUrl);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);
    this.formFieldSettings$ = Observable
      .combineLatest(this.selectedRouteParams$,
        this.store.select(state => state.form.fieldSettings),
        (selectedRouteParams, allFormFieldSettings) => {
          const formName = selectedRouteParams.selectedObjectName;
          const formSchema = selectedRouteParams.selectedSchemaName;
          const formFieldSettings = allFormFieldSettings.filter(fieldSetting => {
            return fieldSetting.formName === formName && fieldSetting.schemaName === formSchema;
          });
          if (formFieldSettings.length === 0 && formName.toLowerCase() !== 'logout') {
            this.store.dispatch(new GetFormFieldSettingsAction(formName))
          } else if (formName.toLowerCase() === 'logout') {
            this.store.dispatch(new RemoveTokenAction(null));
            this.store.dispatch(new Go({path: ['/']}));
          }
          return formFieldSettings
        });

    this.formSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.form.formSettings),
        (pathName, formSettings) => {
          const formName = pathName.split('/').pop();
          if (formSettings === null && formName.toLowerCase() !== 'logout') {
            this.store.dispatch(new GetFormSettingsAction(formName))
          } else if (formName.toLowerCase() === 'logout') {
            this.store.dispatch(new RemoveTokenAction(null))
          }
          return formSettings || null;
        })
  }

  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
      .map(key => delete formValue[key]);
    this.selectedPathName$.take(1).subscribe(selectedPathName => {
        const post = {
          schema: 'admin',
          path: selectedPathName,
          data: formValue,
        };
        if (selectedPathName === '/rpc/login') {
          const postAction = new SendLoginPostRequestAction(post);
          this.store.dispatch(postAction)
        } else {
          const postAction = new SendPostRequestAction(post);
          this.store.dispatch(postAction)
        }
      },
    );
  }
}
