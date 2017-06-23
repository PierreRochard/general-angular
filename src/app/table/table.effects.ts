import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {of} from 'rxjs/observable/of';

import {Action} from '@ngrx/store';

import {routerActions} from '@ngrx/router-store';
import {SendGetRequestAction} from '../rest/rest.actions';
import {ConnectAction} from '../websocket/websocket.actions';

import {ReceiveTableColumnSettingsAction, TableActionTypes} from './table.actions';
import {TableService} from './table.service';

@Injectable()
export class TableEffects {

  @Effect()
  getTableRecords$: Observable<Action> = this.actions$
    .ofType(TableActionTypes.GET_TABLE_RECORDS)
    .switchMap(action => this.tableService.get_table_records(action.payload)
      .me);

  @Effect()
  getTableColumnSettings$ = this.actions$
    .ofType(TableActionTypes.GET_TABLE_COLUMN_SETTINGS)
    .switchMap(action => this.tableService.get_table_column_settings(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveTableColumnSettingsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveTableColumnSettingsAction(error));
      })
    );

  constructor(
    private actions$: Actions,
    private tableService: TableService,
  ) {}
}
