import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {of} from 'rxjs/observable/of';

import {Action} from '@ngrx/store';


import {
  ReceiveDatatableColumnsAction, ReceiveTableRecordsAction, TableActionTypes,
  TableRecordsAreLoadingAction, UpdateRowCountAction
} from './table.actions';
import {TableService} from './table.service';

@Injectable()
export class TableEffects {

  @Effect()
  getTableRecords$: Observable<Action> = this.actions$
    .ofType(TableActionTypes.GET_TABLE_RECORDS)
    .switchMap(action => this.tableService.get_table_records(action.payload)
      .mergeMap(response => {
        const rowCountString = response.headers.get('content-range').split('/')[1];
        const rowCount = parseInt(rowCountString, 10);
        return [
          new ReceiveTableRecordsAction(response.json()),
          new UpdateRowCountAction(rowCount),
          new TableRecordsAreLoadingAction(false)
        ];
      })
      .catch(error => {
        return of(new ReceiveTableRecordsAction(error));
      }));

  @Effect()
  getTableColumnSettings$ = this.actions$
    .ofType(TableActionTypes.GET_DATATABLE_COLUMNS)
    .switchMap(action => this.tableService.get_datatable_columns(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveDatatableColumnsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableColumnsAction(error));
      })
    );

  constructor(
    private actions$: Actions,
    private tableService: TableService,
  ) {}
}
