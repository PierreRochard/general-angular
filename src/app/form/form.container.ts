import {Component} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {SendPostRequestAction} from '../rest/rest.actions';

import {AppState, getSchemaState} from '../app.reducers';
import {SchemaState} from "../schema/schema.reducers";


@Component({
  selector: 'form-container',
  template: `<form-component
                [schemaState]="schemaState$ | async"
                (onSubmit)="onSubmit($event)">
              </form-component>`
})
export class FormContainer {
  schemaState$: Observable<SchemaState>;

  constructor(private store: Store<AppState>) {
    this.schemaState$ = store.select(getSchemaState);
  }
  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
                          .map(key=> delete formValue[key]);
    this.store.select(getSchemaState).take(1)
      .subscribe(schemaState => this.store.dispatch(
        new SendPostRequestAction({path: schemaState.selectedPathName, data: formValue}))
      )
  }
}
