import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `<h1>Table</h1>
              <div class="ui-g">
                <div class="ui-g-12">
                  <p-fieldset legend="Create">
                  <form-container></form-container>
                  </p-fieldset>
                </div>
                <div class="ui-g-12">
                  <p-fieldset legend="Read">
                  <table-datatable [data]="records$ | async"></table-datatable>
                  </p-fieldset>
                </div>
              </div>`
})
export class TableContainer {
  public records$: Observable<any[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.records$ = this.store.select(fromRoot.getRecords);
  }
}

