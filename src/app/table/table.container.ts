import {
  ChangeDetectionStrategy, Component, OnDestroy,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from '@ngrx/store';

import { LazyLoadEvent } from 'primeng/primeng';

import { AppState, getCurrentParams } from '../app.reducers';
import { RouteParams } from '../router/router.models';

import {
  DeleteRecordAction,
  GetSuggestionsAction,
  UpdateRecordAction,
  UpdateColumnsVisibilityAction,
  UpdateKeywordAction,
  UpdatePaginationAction,
  UpdateSortAction,
  SelectTableAction,
} from './table.actions';
import {
  Datatable, DatatableColumn, EditEvent,
  MultiselectOutput, DeleteRecord, UpdateRecord, SuggestionsQuery,
} from './table.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-container',
  template: `
    <app-table-data-mapping-component
      *ngIf="!(isDatatableLoading$ | async) && hasDataMapping"
      [suggestions]="suggestions$ | async"
      (getKeywordSuggestions)="getKeywordSuggestions($event)"
      (getMappingSuggestions)="getSuggestions($event)"
    >
    </app-table-data-mapping-component>
    <app-table-component
      *ngIf="!(isDatatableLoading$ | async) && !(areColumnsLoading$ | async)"
      [areRecordsLoading]="areRecordsLoading$ | async"
      [columns]="columns$ | async"
      [datatable]="datatable$ | async"
      [records]="records$ | async"
      [suggestions]="suggestions$ | async"
      [totalRecords]="totalRecords$ | async"
      (getSuggestions)="getSuggestions($event)"
      (onDelete)="onDelete($event)"
      (onEditCancel)="onEditCancel($event)"
      (onEditComplete)="onEditComplete($event)"
      (onPagination)="onPagination($event)"
      (onSort)="onSort($event)"
      (onMultiselect)="updateColumns($event)"
    >
    </app-table-component>`,
})
export class TableContainer implements OnDestroy, OnInit {
  public areColumnsLoading$: Observable<boolean>;
  public areRecordsLoading$: Observable<boolean>;
  public hasDataMapping: boolean = false;
  public columns$: Observable<DatatableColumn[]>;
  public datatable$: Observable<Datatable | null>;
  public isDatatableLoading$: Observable<boolean>;
  public records$: Observable<any[]>;
  public selectedRouteParams$: Observable<RouteParams>;
  public suggestions$: Observable<string[]>;
  public totalRecords$: Observable<number | null>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.areColumnsLoading$ = this.store.select(state => state.table.areColumnsLoading);
    this.areRecordsLoading$ = this.store.select(state => state.table.areRecordsLoading);
    this.columns$ = this.store.select(state => state.table.columns);
    this.datatable$ = this.store.select(state => state.table.datatable);
    this.isDatatableLoading$ = this.store.select(state => state.table.isDatatableLoading);
    this.records$ = this.store.select(state => state.table.records);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);
    this.suggestions$ = this.store.select(state => state.table.suggestions);
    this.totalRecords$ = this.store.select(state => state.table.rowCount);

    this.selectedRouteParams$
      .filter(selectedRouteParams => selectedRouteParams.selectedObjectType === 'table')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(selectedRouteParams => {
        this.store.dispatch(new SelectTableAction(selectedRouteParams));
      });
  }

  getSuggestions(query: SuggestionsQuery) {
    this.store.dispatch(new GetSuggestionsAction(query));
  }

  getKeywordSuggestions(query: SuggestionsQuery) {
    this.store.dispatch(new UpdateKeywordAction(query));
    this.store.dispatch(new GetSuggestionsAction(query));
  }

  onDelete(deleteRecord: DeleteRecord) {
    this.store.dispatch(new DeleteRecordAction(deleteRecord));
  }

  onEditCancel(event: EditEvent) {
    // const routeParams: RouteParams = {
    //   selectedObjectName: event.table_name,
    //   selectedSchemaName: event.schema_name,
    //   selectedObjectType: 'table',
    // };
    // this.store.dispatch(new GetDatatableAction(routeParams));
  }

  onEditComplete(event: UpdateRecord) {
    this.store.dispatch(new UpdateRecordAction(event));
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
