import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { GET_MENUBAR, ReceiveMenubarAction } from './menubar.actions';
import { MenubarService } from './menubar.service';
import { RemoveTokenAction } from '../auth/auth.actions';


@Injectable()
export class MenubarEffects {

  
  sendGetRequest$ = createEffect(() => this.actions$.pipe(
    ofType(GET_MENUBAR),
    switchMap(() => this.menubarService.get()
      .pipe(
        mergeMap((response: any) => {
          return [
            new ReceiveMenubarAction(response.body),
          ];
        }),
        catchError(error => {
          const unauthorizedCode = 401;
          if (error.status === unauthorizedCode) {
            return of(new RemoveTokenAction(''));
          }
          return of(new ReceiveMenubarAction(error));
        }),
      ))));

  constructor(private actions$: Actions,
              private menubarService: MenubarService,) {
  }
}
