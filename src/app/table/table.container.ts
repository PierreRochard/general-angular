import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `<h1>Table</h1>`
})
export class TableContainer {
  schemaDefinitions$: Observable<any>;
  constructor(private store: Store<fromRoot.State>) {
    this.schemaDefinitions$ = store.select(fromRoot.getDefinitions);
  }
}
