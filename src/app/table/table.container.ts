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
  SelectTableAction, GetSuggestions,
} from './table.actions';
import {
  Datatable, DatatableColumn, EditEvent,
  MultiselectOutput, SuggestionsQuery,
} from './table.models';
import { Subject } from 'rxjs/Subject';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-container',
  template: `
    <app-table-component [areRecordsLoading]="areRecordsLoading$ | async"
                         [columns]="columns$ | async"
                         [datatable]="datatable$ | async"
                         [records]="records$ | async"
                         [rowLimit]="rowLimit$ | async"
                         [rowOffset]="rowOffset$ | async"
                         [suggestions]="suggestions$ | async"
                         [sortColumn]="sortColumn$ | async"
                         [sortOrder]="sortOrder$ | async"
                         [tableName]="tableName$ | async"
                         [totalRecords]="totalRecords$ | async"
                         (getSuggestions)="getSuggestions($event)"
                         (onEditCancel)="onEditCancel($event)"
                         (onEditComplete)="onEditComplete($event)"
                         (onPagination)="onPagination($event)"
                         (onSort)="onSort($event)"
                         (onMultiselect)="updateColumns($event)"
    >
    </app-table-component>`,
})
export class TableContainer implements OnDestroy, OnInit {
  public areRecordsLoading$: Observable<boolean>;
  public columns$: Observable<DatatableColumn[]>;
  public datatable$: Observable<Datatable | null>;
  public records$: Observable<any[]>;
  public rowLimit$: Observable<number | null>;
  public rowOffset$: Observable<number | null>;
  public schemaName$: Observable<string | null>;
  public selectedRouteParams$: Observable<RouteParams>;
  public suggestions$: Observable<string[]>;
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
    this.selectedRouteParams$ = this.store.select(getCurrentParams);
    this.suggestions$ = this.store.select(state => state.table.suggestions);
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

  getSuggestions(query: SuggestionsQuery) {
    this.store.dispatch(new GetSuggestions(query));
  }

  onEditCancel(event: EditEvent) {
    const routeParams: RouteParams = {
      selectedObjectName: event.table_name,
      selectedSchemaName: event.schema_name,
      selectedObjectType: 'table',
    };
    this.store.dispatch(new GetDatatableAction(routeParams));
  }

  onEditComplete(edit: {column: DatatableColumn, row: any, value: string}) {
    const {column, row, value} = edit;
    console.log(edit);
    const update_payload = {
      data: value,
      record_id: row.id,
      column_name: column.column_name,
      table_name: column.table_name,
      schema_name: column.schema_name,
    };
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
