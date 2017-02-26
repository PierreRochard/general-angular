import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {RestClient} from "../rest/rest.service";
import {Property} from "../schema/schema.models";

@Component({
  selector: 'table-container',
  template: `<h1>Table</h1>
<table-datatable [data]="data$ | async"></table-datatable>
`
})
export class TableContainer {
  data$: Observable<any[]>;
  selectedPathName$: Observable<string>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>,
              private http: RestClient,) {
    this.data$ = this.store.take(1).switchMap(state => {
        return this.http.get(state.router.path).map(response => response.json())
      }
    );
    this.selectedPathName$ = store.select(fromRoot.getSelectedPathName);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames);
  }
  public onSubmit(formValue: any) {
    this.store.dispatch(new rest.SubmitFormAction(formValue));
  }
}
