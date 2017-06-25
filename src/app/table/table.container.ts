import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import { GetTableColumnSettingsAction, GetTableRecordsAction, UpdateTableNameAction } from './table.actions';
import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [tableRecords]="records$ | async"
                             [tableColumnSettings]="columns | async"
                             [tableRecordsAreLoading]="recordsAreLoading$ | async"
                             [totalRecords]="totalRecords$ | async"
        >
        </app-table-component>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public selectedPathName$: Observable<string>;
  public records$: Observable<any[]>;
  public columns: Observable<any[]>;
  public recordsAreLoading$: Observable<boolean>;
  public totalRecords$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.recordsAreLoading$ = this.store.select(state => state.table.tableRecordsAreLoading);
    this.records$ = this.store.select(state => state.table.records);
    this.totalRecords$ = this.store.select(state => state.table.rowCount);

    this.columns = Observable
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

    this.records$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.tableName),
        this.store.select(state => state.table.records),
        (pathName, oldTableName, records) => {
          const newTableName = pathName.split('/').pop();
          if ( newTableName !== oldTableName ) {
            this.store.dispatch(new GetTableRecordsAction(newTableName));
            this.store.dispatch(new UpdateTableNameAction(newTableName));
          }
          return records
        })
  }
}
