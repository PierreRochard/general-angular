import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { sendPostRequest } from '../rest/rest.actions';

import { AppState, getCurrentParams } from '../app.reducers';
import { FormField } from './form.models';
import { selectForm } from './form.actions'
import {
  removeToken,
  sendLoginPostRequest,
} from '../auth/auth.actions';
import { go } from '../router/router.actions';
import { RouteParams } from '../router/router.models';
import { selectFormFieldSettings, selectFormSettings } from './form.selectors';


@Component({
    selector: 'app-form-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if ((formFieldSettings$ | async) !== null && (formSettings$ | async) !== null) {
      <app-form-component
        [formSettings]="formSettings$ | async"
        [formFieldSettings]="formFieldSettings$ | async"
        (onSubmit)="onSubmit($event)">
      </app-form-component>
    }`,
    standalone: false
})
export class FormContainer implements OnDestroy, OnInit {
  public formFieldSettings$: Observable<FormField[]>;
  public formSettings$: Observable<any>;
  public selectedRouteParams$: Observable<RouteParams>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    this.formFieldSettings$ = this.store.select(selectFormFieldSettings);
    this.formSettings$ = this.store.select(selectFormSettings);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);

    this.selectedRouteParams$
      .pipe(
        filter(selectedRouteParams => selectedRouteParams.selectedObjectType === 'form'),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(selectedRouteParams => {
      if (selectedRouteParams.selectedObjectName === 'logout') {
        this.store.dispatch(removeToken());
        this.store.dispatch(go({path: ['/']}));
      } else {
        this.store.dispatch(selectForm({ params: selectedRouteParams }));
      }
    })
  }

  public onSubmit(formValue: Record<string, string>) {
    const trimmed = Object.keys(formValue).reduce<Record<string, string>>((acc, key) => {
      const value = formValue[key];
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    this.selectedRouteParams$.pipe(take(1)).subscribe(selectedRouteParams => {
      const post = {
        schemaName: selectedRouteParams.selectedSchemaName,
        formName: selectedRouteParams.selectedObjectName,
        data: trimmed,
      };
      if (post.formName === 'login') {
        this.store.dispatch(sendLoginPostRequest({ payload: post }))
      } else {
        this.store.dispatch(sendPostRequest(post))
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
