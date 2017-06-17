import {Component} from '@angular/core';

import {Observable} from 'rxjs/observable';

import {Store} from '@ngrx/store';

import {AppState, getSchemaState} from '../app.reducers';

@Component({
  selector: 'app-home-container',
  template: `<h1>Home</h1>`
})
export class HomeContainer {
  schemaDefinitions$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.schemaDefinitions$ = store.select(getSchemaState);
  }
}
