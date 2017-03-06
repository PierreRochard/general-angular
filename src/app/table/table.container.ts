import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as rest from '../rest/rest.actions';
import * as table from './table.actions';

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
                  <table-datatable [records]="records$ | async"
                                   [selectedRecords]="selectedRecords$ | async"
                                   [routerPath]="routerPath$ | async"
                                   (onDelete)="onDelete($event)"
                                   (selectionChange)="selectionChange($event)"
                                   >
                  </table-datatable>
                  </p-fieldset>
                </div>
              </div>`
})
export class TableContainer {
  public records$: Observable<any[]>;
  public selectedRecords$: Observable<any[]>;
  public routerPath$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.records$ = this.store.select(fromRoot.getRecords);
    this.routerPath$ = this.store.select(fromRoot.routerPath);
  }

  public onDelete() {
    this.selectedRecords$.map(records => records.map(record => this.store.dispatch(new rest.SendDeleteRequestAction(record.id))));
    this.store.dispatch(new table.DeselectRecordsAction())
  }

  public selectionChange(records: any[]) {
    this.store.dispatch(new table.SelectRecordsAction(records))
  }

}

