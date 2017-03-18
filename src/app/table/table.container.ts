import {Component, ChangeDetectorRef} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as rest from '../rest/rest.actions';
import * as table from './table.actions';

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `<div class="ui-g">
                <div class="ui-g-12">
                  <p-fieldset legend="Create">
                  <form-container></form-container>
                  </p-fieldset>
                </div>
                <div class="ui-g-12">
                  <p-fieldset legend="Read">
                  <table-ngx-datatable [records]="records$ | async"
                                   [selectedRecords]="selectedRecords$ | async"
                                   (onDelete)="onDelete()"
                                   (selectionChange)="selectionChange($event)"
                                   >
                  </table-ngx-datatable>
                  </p-fieldset>
                </div>
              </div>`
})
export class TableContainer {
  public records$: Observable<any[]>;
  public selectedRecords$: Observable<any[]>;

  constructor(private store: Store<fromRoot.AppState>, private changeDetectorRef: ChangeDetectorRef) {
    this.records$ = this.store.select(fromRoot.getRecords);
    this.selectedRecords$ = this.store.select(fromRoot.getSelectedRecords);
  }

  public onDelete() {
    this.selectedRecords$.take(1).subscribe(records => records.map(record => this.store.dispatch(new rest.SendDeleteRequestAction(record.id))));
  }

  public selectionChange(records: any[]) {
    this.changeDetectorRef.detectChanges();
    this.store.dispatch(new table.SelectRecordsAction(records))
  }

}

