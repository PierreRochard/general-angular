import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import {
  GetDatatableAction, GetDatatableColumnsAction, UpdateDatatablePaginationAction,
  UpdateTableNameAction
} from './table.actions';
import { AppState } from '../app.reducers';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [areRecordsLoading]="areRecordsLoading$ | async"
                             [columns]="columns$ | async"
                             [records]="records$ | async"
                             [rowLimit]="rowLimit$ | async"
                             [totalRecords]="totalRecords$ | async"
                             (onLazyLoad)="loadData($event)"
        >
        </app-table-component>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public areRecordsLoading$: Observable<boolean>;
  public columns$: Observable<any[]>;
  public records$: Observable<any[]>;
  public rowLimit$: Observable<number>;
  public selectedPathName$: Observable<string>;
  public totalRecords$: Observable<number>;

  constructor(private store: Store<AppState>) {
  }

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
          if (newTableName !== oldTableName) {
            this.store.dispatch(new GetDatatableAction(newTableName));
            this.store.dispatch(new GetDatatableColumnsAction(newTableName));
            this.store.dispatch(new UpdateTableNameAction(newTableName));
          }
          return records
        })
  }

  loadData(event: LazyLoadEvent) {
    this.store.dispatch(new UpdateDatatablePaginationAction(event));
    console.log(event);
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort in single sort mode
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    // filters: Filters object having field as key and filter value, filter matchMode as value
    // globalFilter: Value of the global filter if available
    //  this.cars = // do a request to a remote datasource using a service and return the cars that match the lazy load criteria
  }
}
