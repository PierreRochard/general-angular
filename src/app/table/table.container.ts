import {
  ChangeDetectionStrategy, Component, OnDestroy,
  OnInit,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { AppState, getCurrentParams } from '../app.reducers';
import { RouteParams } from '../router/router.models';

import {
  deleteRecord,
  getSuggestions,
  updateRecord,
  updateColumnsVisibility,
  updateKeyword,
  updatePagination,
  updateSort,
  selectTable,
} from './table.actions';
import {
  Datatable, DatatableColumn, EditEvent,
  MultiselectOutput, DeleteRecord, UpdateRecord, SuggestionsQuery, DatatableUpdate,
} from './table.models';
import {
  selectAreColumnsLoading,
  selectAreRecordsLoading,
  selectColumns,
  selectDatatable,
  selectIsDatatableLoading,
  selectRecords,
  selectRowCount,
  selectSuggestions,
} from './table.selectors';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-table-container',
    template: `
    @if ((isDatatableLoading$ | async) === false) {
      <app-table-data-mapping-component
        [suggestions]="suggestions$ | async"
        (getKeywordSuggestions)="getKeywordSuggestions($event)"
        (getMappingSuggestions)="getSuggestions($event)"
        >
      </app-table-data-mapping-component>
    }
    @if ((isDatatableLoading$ | async) === false && (areColumnsLoading$ | async) === false) {
      <app-table-component
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
      </app-table-component>
    }`,
    standalone: false
})
export class TableContainer implements OnDestroy, OnInit {
  public areColumnsLoading$: Observable<boolean>;
  public areRecordsLoading$: Observable<boolean>;
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
    this.areColumnsLoading$ = this.store.select(selectAreColumnsLoading);
    this.areRecordsLoading$ = this.store.select(selectAreRecordsLoading);
    this.columns$ = this.store.select(selectColumns);
    this.datatable$ = this.store.select(selectDatatable);
    this.isDatatableLoading$ = this.store.select(selectIsDatatableLoading);
    this.records$ = this.store.select(selectRecords);
    this.selectedRouteParams$ = this.store.select(getCurrentParams);
    this.suggestions$ = this.store.select(selectSuggestions);
    this.totalRecords$ = this.store.select(selectRowCount);

    this.selectedRouteParams$
      .pipe(
        filter(selectedRouteParams => !!selectedRouteParams && selectedRouteParams.selectedObjectType === 'table'),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(selectedRouteParams => {
        this.store.dispatch(selectTable({ params: selectedRouteParams }));
      });
  }

  getSuggestions(query: SuggestionsQuery) {
    this.store.dispatch(getSuggestions({ query }));
  }

  getKeywordSuggestions(query: SuggestionsQuery) {
    this.store.dispatch(updateKeyword({ column: query.column, value: query.value }));
    this.store.dispatch(getSuggestions({ query }));
  }

  onDelete(deletePayload: DeleteRecord) {
    this.store.dispatch(deleteRecord({ delete: deletePayload }));
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
    this.store.dispatch(updateRecord({ update: event }));
  }

  onPagination(event: DatatableUpdate) {
    this.store.dispatch(updatePagination({ update: event }));
  }

  onSort(event: DatatableUpdate) {
    this.store.dispatch(updateSort({ update: event }));
  }

  updateColumns(event: MultiselectOutput) {
    if (event.added.length > 0) {
      this.store.dispatch(updateColumnsVisibility({
        columns: event.added,
        isVisible: true,
      }));
    }
    if (event.removed.length > 0) {
      this.store.dispatch(updateColumnsVisibility({
        columns: event.removed,
        isVisible: false,
      }));
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
