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
  UpdateColumnsVisibilityAction,
  UpdatePaginationAction,
  UpdateSortAction,
  SelectTableAction,
} from './table.actions';
import {
  Datatable, DatatableColumn, EditEvent,
  MultiselectOutput,
} from './table.models';
import { Subject } from 'rxjs/Subject';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [areRecordsLoading]="areRecordsLoading$ | async"
                             [columns]="columns$ | async"
                             [datatable]="datatable$ | async"
                             [records]="records$ | async"
                             [rowLimit]="rowLimit$ | async"
                             [rowOffset]="rowOffset$ | async"
                             [sortColumn]="sortColumn$ | async"
                             [sortOrder]="sortOrder$ | async"
                             [tableName]="tableName$ | async"
                             [totalRecords]="totalRecords$ | async"
                             (onDropdownFocus)="onDropdownFocus($event)"
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
  public columns$: Observable<DatatableColumn[]>;
  public datatable$: Observable<Datatable | null>;
  public records$: Observable<any[]>;
  public rowLimit$: Observable<number | null>;
  public rowOffset$: Observable<number | null>;
  public schemaName$: Observable<string | null>;
  public selectedPathName$: Observable<string>;
  public selectedRouteParams$: Observable<RouteParams>;
  public sortColumn$: Observable<string | null>;
  public sortOrder$: Observable<number | null>;
  public tableName$: Observable<string | null>;
  public totalRecords$: Observable<number | null>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.columns$ = this.store.select(state => state.table.columns);
    this.datatable$ = this.store.select(state => state.table.datatable);
    this.records$ = this.store.select(state => state.table.records);
    this.areRecordsLoading$ = this.store.select(state => state.table.areRecordsLoading);
    this.rowLimit$ = this.store.select(state => state.table.rowLimit);
    this.rowOffset$ = this.store.select(state => state.table.rowOffset);
    this.schemaName$ = this.store.select(state => state.table.schemaName);
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

  onDropdownFocus(column: DatatableColumn) {
    console.log(column);
  }

  onEditCancel(event: EditEvent) {
    console.log(event);
    const routeParams: RouteParams = {
      selectedObjectName: event.table_name,
      selectedSchemaName: event.schema_name,
      selectedObjectType: 'table',
    };
    this.store.dispatch(new GetDatatableAction(routeParams));
  }

  onEditComplete(event: EditEvent) {
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
