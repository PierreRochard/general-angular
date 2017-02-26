import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'table-datatable',
  template: `
<p-dataTable [value]="cars">
    <p-column field="vin" header="Vin"></p-column>
    <p-column field="year" header="Year"></p-column>
    <p-column field="brand" header="Brand"></p-column>
    <p-column field="color" header="Color"></p-column>
</p-dataTable>
`
})
export class TableDatatableComponent {
  schemaDefinitions$: Observable<any>;
  constructor(private store: Store<fromRoot.State>) {
    this.schemaDefinitions$ = store.select(fromRoot.getDefinitions);
  }
}
