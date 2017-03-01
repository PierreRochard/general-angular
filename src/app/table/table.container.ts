import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {RestClient} from "../rest/rest.service";

@Component({
  selector: 'table-container',
  template: `<h1>Table</h1>
              <form-container></form-container>
              <table-datatable [data]="data$ | async"></table-datatable>`
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

