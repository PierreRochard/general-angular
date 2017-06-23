import { Component, OnDestroy, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import { GetTableColumnSettingsAction, GetTableRecordsAction, RemoveTableRecordsAction } from './table.actions';
import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [tableRecords]="tableRecords$ | async"
                             [tableColumnSettings]="tableColumnSettings$ | async"
        >
        </app-table-component>
      </div>
    </div>`
})
export class TableContainer implements OnInit, OnDestroy {
  public selectedPathName$: Observable<string>;
  public tableRecords$: Observable<any[]>;
  public tableColumnSettings$: Observable<any[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.tableRecords$ = this.store.select(getRecords);

    this.tableColumnSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.tableColumnSettings),
        (pathName, tableColumnSettings) => {
          const tableName = pathName.split('/').pop();
          tableColumnSettings = tableColumnSettings.filter(columnSetting => {
            return columnSetting.table_name === tableName;
          });
          if (tableColumnSettings.length === 0) {
            this.store.dispatch(new GetTableColumnSettingsAction(tableName))
          }
          return tableColumnSettings
        });

    this.tableRecords$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.records),
        (pathName, records) => {
          const tableName = pathName.split('/').pop();
          if (records === null) {
            this.store.dispatch(new GetTableRecordsAction(tableName));
          }
          return records
        })
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveTableRecordsAction(null));
  }
}
