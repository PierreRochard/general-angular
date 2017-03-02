import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as auth from '../auth/auth.actions';

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'home-container',
  template: `<h1>Home</h1>
              <apiurl-component [apiUrl]="apiUrl$ | async"
                                (onSubmit)="onSubmit($event)"
              ></apiurl-component>
              {{schemaDefinitions$ | async | json}}`
})
export class HomeContainer {
  schemaDefinitions$: Observable<any>;
  apiUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.schemaDefinitions$ = store.select(fromRoot.getDefinitions);
    this.apiUrl$ = store.select(fromRoot.getApiUrl);
  }
  public onSubmit(formValue: any) {
    Object.keys(formValue).filter(key => formValue[key] === '')
      .map(key=> delete formValue[key]);
    console.log(formValue);
    this.store.dispatch(new auth.AddApiUrlAction(formValue['API URL']));
  }
}
