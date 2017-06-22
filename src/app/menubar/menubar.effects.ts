import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';

import {ReceiveMenubarAction, MenubarActionTypes} from './menubar.actions';
import {MenubarService} from './menubar.service';
import {RemoveTokenAction} from '../auth/auth.actions';


@Injectable()
export class MenubarEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(MenubarActionTypes.GET_MENUBAR)
    .switchMap(action => this.menubarService.get()
      .mergeMap(response => {
        return [
          new ReceiveMenubarAction(response.json()),
        ];
      })
      .catch(error => {
        console.log('error');
        if (error.status === 401) {
          return of(new RemoveTokenAction(null))
        }
        return of(new ReceiveMenubarAction(error));
      })
    );
  constructor (
    private actions$: Actions,
    private menubarService: MenubarService,
  ) { }
}
