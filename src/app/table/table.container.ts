import {
  ChangeDetectionStrategy, Component, OnDestroy,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { LazyLoadEvent } from 'primeng/primeng';

import { AppState, getCurrentParams, getCurrentUrl } from '../app.reducers';
import { RouteParams } from '../router/router.models';

import {
  UpdateRecordAction,
  GetDatatableAction,
  GetDatatableColumnsAction,
  UpdateColumnsVisibilityAction,
  UpdatePaginationAction,
  UpdateSortAction,
  UpdateTableNameAction,
  SelectTableAction,
} from './table.actions';
import { MultiselectOutput } from './table.models';
import { Subject } from 'rxjs/Subject';

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
    </div>`,
})
export class TableContainer implements OnDestroy, OnInit {
  public areRecordsLoading$: Observable<boolean>;
  public columns$: Observable<any[]>;
  public records$: Observable<any[]>;
  public rowLimit$: Observable<number>;
  public rowOffset$: Observable<number>;
  public selectedPathName$: Observable<string>;
  public selectedRouteParams$: Observable<RouteParams>;
  public sortColumn$: Observable<string>;
  public sortOrder$: Observable<number>;
  public tableName$: Observable<string>;
  public totalRecords$: Observable<number>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.columns$ = this.store.select(state => state.table.columns);
    this.records$ = this.store.select(state => state.table.records);
    this.areRecordsLoading$ = this.store.select(state => state.table.areRecordsLoading);
    this.rowLimit$ = this.store.select(state => state.table.rowLimit);
    this.rowOffset$ = this.store.select(state => state.table.rowOffset);
    this.selectedPathName$ = this.store.select(getCurrentUrl);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);
    this.sortColumn$ = this.store.select(state => state.table.sortColumn);
    this.sortOrder$ = this.store.select(state => state.table.sortOrder);
    this.tableName$ = this.store.select(state => state.table.tableName);
    this.totalRecords$ = this.store.select(state => state.table.rowCount);

    this.selectedRouteParams$
      .filter(selectedRouteParams => selectedRouteParams.selectedObjectType === 'table')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(selectedRouteParams => {
      this.store.dispatch(new SelectTableAction(selectedRouteParams));
    });
  }

  onEditCancel(event) {
    console.log(event);
    this.store.dispatch(new GetDatatableAction(event.table_name));
  }

  onEditComplete(event) {
    const update_payload = {
      column_name: event.column.field,
      data: event.data[event.column.field],
      record_id: event.data.id,
      table_name: event.table_name,
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
        isVisible: true,
      }));
    }
    if (event.removed.length > 0) {
      this.store.dispatch(new UpdateColumnsVisibilityAction({
        columns: event.removed,
        tableName: event.tableName,
        isVisible: false,
      }));
    }
  }

  ngOnDestroy() {
    console.log('destroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
