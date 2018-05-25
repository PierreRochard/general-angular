import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {filter, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

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
  SELECT_TABLE, GET_DATATABLE, GET_SUGGESTIONS, UPDATE_PAGINATION, UPDATE_SORT,
  GET_DATATABLE_COLUMNS, UPDATE_COLUMNS_VISIBILITY, GET_RECORDS,
  GetSuggestionsAction, ReceiveSuggestionsAction, UPDATE_RECORD,
  UpdateRecordAction, DELETE_RECORD, DeleteRecordAction, UPDATE_KEYWORD,
  UpdateKeywordAction,
} from './table.actions';
import { TableService } from './table.service';
import { Datatable, DatatableColumn } from './table.models';
import { RouteParams } from '../router/router.models';
import { AppState } from '../app.reducers';

@Injectable()
export class TableEffects {

  @Effect()
  deleteRecord$ = this.actions$.pipe(
    ofType(DELETE_RECORD),
    withLatestFrom(this.store),
    switchMap(([action, state]: [DeleteRecordAction, AppState]) => {
      return this.tableService.delete_record(action.payload)
        .mergeMap(() => {
          return [
            new GetRecordsAction(state.table.datatable)];
        })
    }));

  @Effect()
  selectTable$ = this.actions$.pipe(
    ofType(SELECT_TABLE),
    map((action: SelectTableAction) => action.payload),
    mergeMap((routeParams: RouteParams) => {
      return [
        new GetDatatableAction(routeParams),
        new GetDatatableColumnsAction(routeParams),
        new UpdateTableNameAction(routeParams),
      ]
    }));

  @Effect()
  getDatatable$ = this.actions$.pipe(
    ofType(GET_DATATABLE),
    switchMap((action: GetDatatableAction) => {
      return this.tableService.get_datatable(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap((response: any) => {
          const datatable: Datatable = response.body[0];
          return [
            new ReceiveDatatableAction(datatable),
            new GetRecordsAction(datatable),
          ];
        })
        .catch((error: any) => {
          return of(new ReceiveDatatableAction(error));
        })
    }));

  @Effect()
  updatePagination$ = this.actions$.pipe(
    ofType(UPDATE_PAGINATION),
    switchMap((action: UpdatePaginationAction) => this.tableService.update_pagination(action.payload)
      .mergeMap((response: any) => {
        const datatable: Datatable = response.body[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable),
        ];
      })
      .catch((error: any) => {
        return of(new ReceiveDatatableAction(error));
      }),
    ));

  @Effect()
  updateKeyword$ = this.actions$.pipe(
    ofType(UPDATE_KEYWORD),
    switchMap((action: UpdateKeywordAction) => this.tableService.update_keyword(action.payload)
      .mergeMap((response: any) => {
        const datatable: Datatable = response.body[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable),
        ];
      })
      .catch((error: any) => {
        return of(new ReceiveDatatableAction(error));
      }),
    ));

  @Effect()
  updateSort$ = this.actions$.pipe(
    ofType(UPDATE_SORT),
    switchMap((action: UpdateSortAction) => this.tableService.update_sort(action.payload)
      .mergeMap((response: any) => {
        console.log(response);
        const datatable: Datatable = response.body[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable),
        ];
      })
      .catch((error: any) => {
        return of(new ReceiveDatatableAction(error));
      }),
    ));

  @Effect()
  getDatatableColumns$ = this.actions$.pipe(
    ofType(GET_DATATABLE_COLUMNS),
    switchMap((action: GetDatatableColumnsAction) => {
      return this.tableService.get_datatable_columns(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap((response: any) => {
          return [
            new ReceiveDatatableColumnsAction(response.body),
          ];
        })
        .catch((error: any) => {
          return of(new ReceiveDatatableColumnsAction(error));
        })
    }));


  @Effect()
  updateColumnsVisibility$ = this.actions$.pipe(
    ofType(UPDATE_COLUMNS_VISIBILITY),
    switchMap((action: UpdateColumnsVisibilityAction) => this.tableService.update_columns_visibility(action.payload)
      .mergeMap((response: any) => {
        return [
          new GetDatatableColumnsAction(response.body[0].table_name),
        ];
      })
      .catch(() => {
        return of(new GetDatatableColumnsAction(action.payload.dataTable));
      }),
    ));

  @Effect()
  getRecords$: Observable<Action> = this.actions$.pipe(
    ofType(GET_RECORDS),
    switchMap((action: GetRecordsAction) => this.tableService.get_records(action.payload)
      .mergeMap((response: any) => {
        const rowCountString = response.headers!.get('content-range')!.split('/')[1];
        const rowCount = parseInt(rowCountString, 10);
        return [
          new ReceiveRecordsAction(response.body),
          new UpdateRowCountAction(rowCount),
          new AreRecordsLoadingAction(false),
        ];
      })
      .catch((error: any) => {
        return of(new ReceiveRecordsAction(error));
      })));

  @Effect()
  getKeywordRecords$: Observable<Action> = this.actions$.pipe(
    ofType(UPDATE_KEYWORD),
    withLatestFrom(this.store),
    switchMap(([action, state]: [UpdateKeywordAction, AppState]) => {
        const datatable: Datatable = state.table.datatable;
        const column: DatatableColumn = action.payload.column;
        column.filter_value = action.payload.value;
        datatable.filter_columns = [action.payload.column];
        return this.tableService.get_records(datatable)
          .mergeMap((response: any) => {
            const rowCountString = response.headers!.get('content-range')!.split('/')[1];
            const rowCount = parseInt(rowCountString, 10);
            return [
              new ReceiveRecordsAction(response.body),
              new UpdateRowCountAction(rowCount),
              new AreRecordsLoadingAction(false),
            ];
          })
          .catch((error: any) => {
            return of(new ReceiveRecordsAction(error));
          })
      }
    ));

  @Effect()
  getSelectItems$ = this.actions$.pipe(
    ofType(GET_SUGGESTIONS),
    switchMap((action: GetSuggestionsAction) => {
      console.log(action.payload);
      return this.tableService.get_suggestions(action.payload)
        .mergeMap((response: any) => {
          return [
            new ReceiveSuggestionsAction(response.body),
          ];
        })
    }));


  @Effect()
  updateRecord$ = this.actions$.pipe(
    ofType(UPDATE_RECORD),
    withLatestFrom(this.store),
    filter(([action, state]: [UpdateRecordAction, AppState]) => {
      // Make sure the value actually changed
      return action.payload.value !== state.table.records.filter(r => r.id === action.payload.record_id)[0][action.payload.column_name]
    }),
    switchMap(([action, state]: [UpdateRecordAction, AppState]) => {
        return this.tableService.update_record(action.payload)
          .mergeMap((): any[] => [])
          .catch((error: any) => {
            return of(new ReceiveDatatableAction(error));
          })
      },
    ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private tableService: TableService) {
  }
}
