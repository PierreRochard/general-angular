import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Component({
  template: `<h1>Home</h1>
{{schema$ | async | json}}`
})
export class HomePageComponent {
  schema$: Observable<any>;
  constructor(private store: Store<fromRoot.State>) {
  this.schema$ = store.select(fromRoot.getSchema);
}
}
