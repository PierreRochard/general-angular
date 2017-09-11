import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { SendPostRequestAction } from '../rest/rest.actions';

import { AppState, getCurrentParams, getCurrentUrl } from '../app.reducers';
import { FormField } from './form.models';
import {
  GetFormFieldSettingsAction,
  GetFormSettingsAction, SelectFormAction,
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
      [formSettings]="formSettings$ | async"
      [formFieldSettings]="formFieldSettings$ | async"
      (onSubmit)="onSubmit($event)">
    </app-form-component>`,
})
export class FormContainer implements OnInit {
  public formFieldSettings$: Observable<FormField[]>;
  public formSettings$: Observable<any>;
  public selectedPathName$: Observable<string>;
  public selectedRouteParams$: Observable<RouteParams>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    this.formFieldSettings$ = this.store.select(state => state.form.fieldSettings);
    this.formSettings$ = this.store.select(state => state.form.formSettings);
    this.selectedPathName$ = this.store.select(getCurrentUrl);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);

    this.selectedRouteParams$.take(1).subscribe(selectedRouteParams => {
      if (selectedRouteParams.selectedObjectName !== 'logout') {
        this.store.dispatch(new SelectFormAction(selectedRouteParams));
      } else {
        this.store.dispatch(new RemoveTokenAction(null));
        this.store.dispatch(new Go({path: ['/']}));
      }
    })
  }

  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
      .map(key => delete formValue[key]);
    this.selectedRouteParams$.take(1).subscribe(selectedRouteParams => {
        const post = {
          schemaName: selectedRouteParams.selectedSchemaName,
          formName: selectedRouteParams.selectedObjectName,
          data: formValue,
        };
        if (post.formName === 'login') {
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
