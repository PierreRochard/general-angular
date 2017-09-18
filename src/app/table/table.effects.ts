import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { Action } from '@ngrx/store';


import {
  ReceiveDatatableAction,
  ReceiveDatatableColumnsAction,
  ReceiveRecordsAction,
  TableActionTypes,
  AreRecordsLoadingAction,
  UpdateRowCountAction,
  GetRecordsAction,
  GetDatatableColumnsAction, GetDatatableAction, UpdatePaginationAction,
  UpdateSortAction, UpdateColumnsVisibilityAction,
  SelectTableAction, UpdateTableNameAction,
} from './table.actions';
import { TableService } from './table.service';
import { Datatable } from './table.models';
import { RouteParams } from '../router/router.models';

@Injectable()
export class TableEffects {

  @Effect()
  selectTable$ = this.actions$
    .ofType(TableActionTypes.SELECT_TABLE)
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
    .ofType(TableActionTypes.GET_DATATABLE)
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
    .ofType(TableActionTypes.UPDATE_PAGINATION)
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
    .ofType(TableActionTypes.UPDATE_SORT)
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
    .ofType(TableActionTypes.GET_DATATABLE_COLUMNS)
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
    .ofType(TableActionTypes.UPDATE_COLUMNS_VISIBILITY)
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
    .ofType(TableActionTypes.GET_RECORDS)
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

  // @Effect()
  // updateRecord$ = this.actions$
  //   .ofType(TableActionTypes.UPDATE_RECORD)
  //   .switchMap((action: UpdateRecordAction) => this.tableService.update_record(action.payload)
  //     .mergeMap(response => {
  //       const tableName = response.url.split('/').slice(-1)[0].split('?')[0];
  //       return [
  //         new GetDatatableAction(tableName),
  //       ];
  //     })
  //     .catch(error => {
  //       return of(new ReceiveDatatableAction(error));
  //     }),
  //   );

  constructor(private actions$: Actions,
              private tableService: TableService) {
  }
}
