import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';

import { GET_MENUBAR, ReceiveMenubarAction } from './menubar.actions';
import { MenubarService } from './menubar.service';
import { RemoveTokenAction } from '../auth/auth.actions';


@Injectable()
export class MenubarEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(GET_MENUBAR)
    .switchMap(() => this.menubarService.get()
      .mergeMap((response: any) => {
        return [
          new ReceiveMenubarAction(response.body),
        ];
      })
      .catch(error => {
        const unauthorizedCode = 401;
        if (error.status === unauthorizedCode) {
          return of(new RemoveTokenAction(''))
        }
        return of(new ReceiveMenubarAction(error));
      })
    );

  constructor(private actions$: Actions,
              private menubarService: MenubarService,) {
  }
}
