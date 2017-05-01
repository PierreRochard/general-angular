import {Component} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import * as rest from '../rest/rest.actions';

import * as fromRoot from '../app.reducers';
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

  constructor(private store: Store<fromRoot.AppState>) {
    this.schemaState$ = store.select(fromRoot.getSchemaState);
  }
  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
                          .map(key=> delete formValue[key]);
    this.store.select(fromRoot.getSchemaState).take(1)
      .subscribe(schemaState => this.store.dispatch(
        new rest.SendPostRequestAction({path: schemaState.selectedPathName, data: formValue}))
      )
  }
}
