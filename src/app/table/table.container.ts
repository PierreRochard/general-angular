import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import {
  EditCancelAction,
  UpdateRecordAction,
  GetDatatableAction,
  GetDatatableColumnsAction, GetRecordsAction,
  UpdateColumnsVisibilityAction,
  UpdatePaginationAction,
  UpdateSortAction,
  UpdateTableNameAction
} from './table.actions';
import { AppState } from '../app.reducers';
import { LazyLoadEvent } from 'primeng/primeng';
import { MultiselectOutput } from './table.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [areRecordsLoading]="areRecordsLoading$ | async"
                             [columns]="columns$ | async"
                             [records]="records$ | async"
                             [rowLimit]="rowLimit$ | async"
                             [rowOffset]="rowOffset$ | async"
                             [sortColumn]="sortColumn$ | async"
                             [sortOrder]="sortOrder$ | async"
                             [tableName]="tableName$ | async"
                             [totalRecords]="totalRecords$ | async"
                             (onEditCancel)="onEditCancel($event)"
                             (onEditComplete)="onEditComplete($event)"
                             (onPagination)="onPagination($event)"
                             (onSort)="onSort($event)"
                             (onMultiselect)="updateColumns($event)"
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
  public rowOffset$: Observable<number>;
  public selectedPathName$: Observable<string>;
  public sortColumn$: Observable<string>;
  public sortOrder$: Observable<number>;
  public tableName$: Observable<string>;
  public totalRecords$: Observable<number>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.columns$ = this.store.select(state => state.table.columns);
    this.records$ = this.store.select(state => state.table.records);
    this.areRecordsLoading$ = this.store.select(state => state.table.areRecordsLoading);
    this.rowLimit$ = this.store.select(state => state.table.rowLimit);
    this.rowOffset$ = this.store.select(state => state.table.rowOffset);
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.sortColumn$ = this.store.select(state => state.table.sortColumn);
    this.sortOrder$ = this.store.select(state => state.table.sortOrder);
    this.tableName$ = this.store.select(state => state.table.tableName);
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

  onEditCancel(event) {
    console.log(event);
    this.store.dispatch(new GetDatatableAction(event.tableName));
  }

  onEditComplete(event) {
    const update_payload = {
      column_name: event.column.field,
      data: event.data[event.column.field],
      record_id: event.data.id,
      table_name: event.tableName
    };
    console.log(update_payload);
    this.store.dispatch(new UpdateRecordAction(update_payload));
  }

  onPagination(event: LazyLoadEvent) {
    this.store.dispatch(new UpdatePaginationAction(event));
  }

  onSort(event: LazyLoadEvent) {
    this.store.dispatch(new UpdateSortAction(event));
  }

  updateColumns(event: MultiselectOutput) {
    if (event.added.length > 0) {
      this.store.dispatch(new UpdateColumnsVisibilityAction({
        columns: event.added,
        tableName: event.tableName,
        isVisible: true
      }));
    }
    if (event.removed.length > 0) {
      this.store.dispatch(new UpdateColumnsVisibilityAction({
        columns: event.removed,
        tableName: event.tableName,
        isVisible: false
      }));
    }
  }
}
