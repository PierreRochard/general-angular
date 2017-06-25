import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import { GetDatatableAction, GetDatatableColumnsAction, GetRecordsAction, UpdateTableNameAction } from './table.actions';
import {AppState} from '../app.reducers';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [tableRecords]="records$ | async"
                             [tableColumnSettings]="columns$ | async"
                             [tableRecordsAreLoading]="areRecordsLoading$ | async"
                             [totalRecords]="totalRecords$ | async"
        >
        </app-table-component>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public columns$: Observable<any[]>;
  public records$: Observable<any[]>;
  public areRecordsLoading$: Observable<boolean>;
  public rowLimit$: Observable<number>;
  public selectedPathName$: Observable<string>;
  public totalRecords$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.columns$ = this.store.select(state => state.table.tableColumns);
    this.records$ = this.store.select(state => state.table.records);
    this.areRecordsLoading$ = this.store.select(state => state.table.areRecordsLoading);
    this.rowLimit$ = this.store.select(state => state.table.rowLimit);
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.totalRecords$ = this.store.select(state => state.table.rowCount);

    this.records$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.tableName),
        this.store.select(state => state.table.records),
        (pathName, oldTableName, records) => {
          const newTableName = pathName.split('/').pop();
          if ( newTableName !== oldTableName ) {
            this.store.dispatch(new GetDatatableAction(newTableName));
            this.store.dispatch(new GetDatatableColumnsAction(newTableName));
            this.store.dispatch(new GetRecordsAction(newTableName));
            this.store.dispatch(new UpdateTableNameAction(newTableName));
          }
          return records
        })
  }
}
