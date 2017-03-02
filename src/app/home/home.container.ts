import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'home-container',
  template: `<h1>Home</h1>
              <apiurl-component [apiUrl]="apiUrl$ | async"></apiurl-component>
              {{schemaDefinitions$ | async | json}}`
})
export class HomeContainer {
  schemaDefinitions$: Observable<any>;
  apiUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.schemaDefinitions$ = store.select(fromRoot.getDefinitions);
    this.apiUrl$ = store.select(fromRoot.getApiUrl);
  }
}
