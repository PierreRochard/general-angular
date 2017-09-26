import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { Action, Store } from '@ngrx/store';


import {
  ReceiveDatatableAction,
  ReceiveDatatableColumnsAction,
  ReceiveRecordsAction,
  AreRecordsLoadingAction,
  UpdateRowCountAction,
  GetRecordsAction,
  GetDatatableColumnsAction, GetDatatableAction, UpdatePaginationAction,
  UpdateSortAction, UpdateColumnsVisibilityAction,
  SelectTableAction, UpdateTableNameAction,
  SELECT_TABLE, GET_DATATABLE, GET_SELECT_ITEMS, UPDATE_PAGINATION, UPDATE_SORT,
  GET_DATATABLE_COLUMNS, UPDATE_COLUMNS_VISIBILITY, GET_RECORDS,
  GetSelectItemsAction, ReceiveSelectItemsAction, UPDATE_RECORD,
  UpdateRecordAction,
} from './table.actions';
import { TableService } from './table.service';
import { Datatable } from './table.models';
import { RouteParams } from '../router/router.models';
import { AppState } from '../app.reducers';

@Injectable()
export class TableEffects {

  @Effect()
  selectTable$ = this.actions$
    .ofType(SELECT_TABLE)
    .map((action: SelectTableAction) => action.payload)
    .mergeMap((routeParams: RouteParams) => {
      return [
        new GetDatatableAction(routeParams),
        new GetDatatableColumnsAction(routeParams),
        new UpdateTableNameAction(routeParams),
      ]
    });

  @Effect()
  getDatatable$ = this.actions$
    .ofType(GET_DATATABLE)
    .switchMap((action: GetDatatableAction) => {
      return this.tableService.get_datatable(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap(response => {
          const datatable: Datatable = response.json()[0];
          return [
            new ReceiveDatatableAction(datatable),
            new GetRecordsAction(datatable),
          ];
        })
        .catch(error => {
          return of(new ReceiveDatatableAction(error));
        })
    });

  @Effect()
  updatePagination$ = this.actions$
    .ofType(UPDATE_PAGINATION)
    .switchMap((action: UpdatePaginationAction) => this.tableService.update_pagination(action.payload)
      .mergeMap(response => {
        const datatable: Datatable = response.json()[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable),
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableAction(error));
      }),
    );

  @Effect()
  updateSort$ = this.actions$
    .ofType(UPDATE_SORT)
    .switchMap((action: UpdateSortAction) => this.tableService.update_sort(action.payload)
      .mergeMap(response => {
        const datatable: Datatable = response.json()[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable),
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableAction(error));
      }),
    );

  @Effect()
  getDatatableColumns$ = this.actions$
    .ofType(GET_DATATABLE_COLUMNS)
    .switchMap((action: GetDatatableColumnsAction) => {
      return this.tableService.get_datatable_columns(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap(response => {
          return [
            new ReceiveDatatableColumnsAction(response.json()),
          ];
        })
        .catch(error => {
          return of(new ReceiveDatatableColumnsAction(error));
        })
    });


  @Effect()
  updateColumnsVisibility$ = this.actions$
    .ofType(UPDATE_COLUMNS_VISIBILITY)
    .switchMap((action: UpdateColumnsVisibilityAction) => this.tableService.update_columns_visibility(action.payload)
      .mergeMap(response => {
        return [
          new GetDatatableColumnsAction(response.json()[0].table_name),
        ];
      })
      .catch(() => {
        return of(new GetDatatableColumnsAction(action.payload.dataTable));
      }),
    );

  @Effect()
  getRecords$: Observable<Action> = this.actions$
    .ofType(GET_RECORDS)
    .switchMap((action: GetRecordsAction) => this.tableService.get_records(action.payload)
      .mergeMap((response: Response) => {
        const rowCountString = response.headers!.get('content-range')!.split('/')[1];
        const rowCount = parseInt(rowCountString, 10);
        return [
          new ReceiveRecordsAction(response.json()),
          new UpdateRowCountAction(rowCount),
          new AreRecordsLoadingAction(false),
        ];
      })
      .catch(error => {
        return of(new ReceiveRecordsAction(error));
      }));

  @Effect()
  getSelectItems$ = this.actions$
    .ofType(GET_SELECT_ITEMS)
    .switchMap((action: GetSelectItemsAction) => {
      return this.tableService.get_select_items(action.payload)
        .mergeMap(response => {
          return [
            new ReceiveSelectItemsAction(response.json()),
          ];
        })
    });


  @Effect()
  updateRecord$ = this.actions$
    .ofType(UPDATE_RECORD)
    .withLatestFrom(this.store)
    .switchMap(([action, state]: [UpdateRecordAction, AppState]) => {
     return this.tableService.update_record(action.payload)
          .mergeMap(() => {
            return [
              new GetRecordsAction(state.table.datatable),
            ];
          })
          .catch(error => {
            return of(new ReceiveDatatableAction(error));
          })
      }
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private tableService: TableService) {
  }
}
