import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';

import {AddTokenAction, RemoveTokenAction} from '../auth/auth.actions';
import {ReceiveMenubarAction, MenubarActionTypes} from './menubar.actions';
import {UpdateSchemaAction} from '../schema/schema.actions';
import {InitializeRecordsAction} from '../table/table.actions';
import {AppState} from '../app.reducers';
import {MenubarService} from './menubar.service';

import {of} from 'rxjs/observable/of';
import {Store, Action} from '@ngrx/store';
import {Response} from '@angular/http';
import {go} from '@ngrx/router-store';

@Injectable()
export class MenubarEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(MenubarActionTypes.GET_MENUBAR)
    .switchMap(action => this.menubarService.get()
      .mergeMap(response => {
        console.log(response);
        return [
          new ReceiveMenubarAction(response),
        ];
      })
      .catch(error => {
        return of(new ReceiveMenubarAction(error));
      })
    );
  constructor (
    private actions$: Actions,
    private menubarService: MenubarService,
    private store: Store<AppState>,
  ) { }
}
