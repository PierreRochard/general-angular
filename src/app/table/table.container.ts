import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {RestClient} from "../rest/rest.service";

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
                  <table-datatable [data]="data$ | async"></table-datatable>
                  </p-fieldset>
                </div>
              </div>`
})
export class TableContainer {
  data$: Observable<any[]>;

  constructor(private store: Store<fromRoot.State>,
              private http: RestClient,) {
    this.data$ = this.store.take(1).switchMap(state => {
        return this.http.get(state.router.path).map(response => response.json())
      }
    );
  }
}

