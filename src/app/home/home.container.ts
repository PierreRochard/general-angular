import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {AppState, getSchemaState} from '../app.reducers';

@Component({
  selector: 'home-container',
  template: `<h1>Home</h1>
              {{schemaDefinitions$ | async | json}}`
})
export class HomeContainer {
  schemaDefinitions$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.schemaDefinitions$ = store.select(getSchemaState);
  }
}
