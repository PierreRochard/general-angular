import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {SendPostRequestAction} from '../rest/rest.actions';

import { AppState, getRouterState, getSchemaState } from '../app.reducers';


@Component({
  selector: 'app-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-component
      [selectedPathName]="selectedPathName$ | async"
      (onSubmit)="onSubmit($event)">
    </app-form-component>`
})
export class FormContainer implements OnInit {
  selectedPathName$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(getRouterState).map(state => state.path);
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
