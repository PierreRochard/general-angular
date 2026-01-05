import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  receiveDatatable,
  receiveDatatableColumns,
  receiveRecords,
  setRecordsLoading,
  updateRowCount,
  getRecords,
  getDatatableColumns,
  getDatatable,
  updatePagination,
  updateSort,
  updateColumnsVisibility,
  selectTable,
  updateTableName,
  getSuggestions,
  receiveSuggestions,
  updateRecord,
  deleteRecord,
  updateKeyword,
} from './table.actions';
import { TableService } from './table.service';
import { ColumnsVisibilityUpdate, Datatable, DatatableColumn } from './table.models';
import { RouteParams } from '../router/router.models';
import { AppState } from '../app.reducers';
import { selectDatatable } from './table.selectors';

@Injectable()
export class TableEffects {

  deleteRecord$ = createEffect(() => this.actions$.pipe(
    ofType(deleteRecord),
    withLatestFrom(this.store),
    switchMap(([action, state]) => {
      return this.tableService.delete_record(action.delete).pipe(
        mergeMap(() => {
          return [
            getRecords({ datatable: state.table.datatable! })];
        }))
    })));

  selectTable$ = createEffect(() => this.actions$.pipe(
    ofType(selectTable),
    map(action => action.params),
    mergeMap((routeParams: RouteParams) => {
      return [
        getDatatable({ params: routeParams }),
        getDatatableColumns({ params: routeParams }),
        updateTableName({ params: routeParams }),
      ]
    })));

  getDatatable$ = createEffect(() => this.actions$.pipe(
    ofType(getDatatable),
    switchMap((action) => {
      return this.tableService.get_datatable(action.params.selectedSchemaName,
        action.params.selectedObjectName).pipe(
        mergeMap((response: any) => {
          const datatable: Datatable = response.body[0];
          return [
            receiveDatatable({ datatable }),
            getRecords({ datatable }),
          ];
        }),
        catchError((error: any) => {
          return of(receiveDatatable({ datatable: error }));
        }))
    })));

  updatePagination$ = createEffect(() => this.actions$.pipe(
    ofType(updatePagination),
    switchMap((action) => this.tableService.update_pagination(action.update).pipe(
      mergeMap((response: any) => {
        const datatable: Datatable = response.body[0];
        return [
          receiveDatatable({ datatable }),
          getRecords({ datatable }),
        ];
      }),
      catchError((error: any) => {
        return of(receiveDatatable({ datatable: error }));
      })),
    )));

  updateKeyword$ = createEffect(() => this.actions$.pipe(
    ofType(updateKeyword),
    switchMap((action) => this.tableService.update_keyword(action).pipe(
      mergeMap((response: any) => {
        const datatable: Datatable = response.body[0];
        return [
          receiveDatatable({ datatable }),
          getRecords({ datatable }),
        ];
      }),
      catchError((error: any) => {
        return of(receiveDatatable({ datatable: error }));
      })),
    )));

  updateSort$ = createEffect(() => this.actions$.pipe(
    ofType(updateSort),
    switchMap((action) => this.tableService.update_sort(action.update).pipe(
      mergeMap((response: any) => {
        const datatable: Datatable = response.body[0];
        return [
          receiveDatatable({ datatable }),
          getRecords({ datatable }),
        ];
      }),
      catchError((error: any) => {
        return of(receiveDatatable({ datatable: error }));
      })),
    )));

  getDatatableColumns$ = createEffect(() => this.actions$.pipe(
    ofType(getDatatableColumns),
    switchMap((action) => {
      return this.tableService.get_datatable_columns(action.params.selectedSchemaName,
        action.params.selectedObjectName).pipe(
        mergeMap((response: any) => {
          return [
            receiveDatatableColumns({ columns: response.body }),
          ];
        }),
        catchError((error: any) => {
          return of(receiveDatatableColumns({ columns: error }));
        }))
    })));

  updateColumnsVisibility$ = createEffect(() => this.actions$.pipe(
    ofType(updateColumnsVisibility),
    withLatestFrom(this.store.select(selectDatatable)),
    switchMap(([action, datatable]) => {
      if (!datatable) {
        return EMPTY;
      }
      const updateData: ColumnsVisibilityUpdate = {
        columns: action.columns.map(column => column.column_name),
        isVisible: action.isVisible,
        schemaName: datatable.schema_name,
        tableName: datatable.table_name,
      };
      const params: RouteParams = {
        selectedSchemaName: datatable.schema_name,
        selectedObjectName: datatable.table_name,
        selectedObjectType: 'table',
      };
      return this.tableService.update_columns_visibility(updateData).pipe(
        mergeMap(() => {
          return [
            getDatatableColumns({ params }),
          ];
        }),
        catchError(() => {
          return of(getDatatableColumns({ params }));
        }));
    })));

  getRecords$ = createEffect(() => this.actions$.pipe(
    ofType(getRecords),
    switchMap((action) => this.tableService.get_records(action.datatable).pipe(
      mergeMap((response: any) => {
        const rowCountString = response.headers!.get('content-range')!.split('/')[1];
        const rowCount = parseInt(rowCountString, 10);
        return [
          receiveRecords({ records: response.body }),
          updateRowCount({ rowCount }),
          setRecordsLoading({ isLoading: false }),
        ];
      }),
      catchError((error: any) => {
        return of(receiveRecords({ records: error }));
      })))));

  getKeywordRecords$ = createEffect(() => this.actions$.pipe(
    ofType(updateKeyword),
    withLatestFrom(this.store),
    switchMap(([action, state]) => {
        const datatable: Datatable = state.table.datatable!;
        const column: DatatableColumn = action.column;
        column.filter_value = action.value;
        datatable.filter_columns = [action.column];
        return this.tableService.get_records(datatable).pipe(
          mergeMap((response: any) => {
            const rowCountString = response.headers!.get('content-range')!.split('/')[1];
            const rowCount = parseInt(rowCountString, 10);
            return [
              receiveRecords({ records: response.body }),
              updateRowCount({ rowCount }),
              setRecordsLoading({ isLoading: false }),
            ];
          }),
          catchError((error: any) => {
            return of(receiveRecords({ records: error }));
          }))
      }
    )));

  getSelectItems$ = createEffect(() => this.actions$.pipe(
    ofType(getSuggestions),
    switchMap((action) => {
      return this.tableService.get_suggestions(action.query).pipe(
        mergeMap((response: any) => {
          return [
            receiveSuggestions({ suggestions: response.body }),
          ];
        }));
    })));


  updateRecord$ = createEffect(() => this.actions$.pipe(
    ofType(updateRecord),
    withLatestFrom(this.store),
    filter(([action, state]) => {
      // Make sure the value actually changed
      return action.update.value !== state.table.records.filter(r => r.id === action.update.record_id)[0][action.update.column_name]
    }),
    switchMap(([action]) => {
        return this.tableService.update_record(action.update).pipe(
          mergeMap((): any[] => []),
          catchError((error: any) => {
            return of(receiveDatatable({ datatable: error }));
          }))
      },
    )));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private tableService: TableService) {
  }
}
