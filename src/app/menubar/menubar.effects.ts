import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { getMenubar, receiveMenubar } from './menubar.actions';
import { MenubarService } from './menubar.service';
import { removeToken } from '../auth/auth.actions';


@Injectable()
export class MenubarEffects {

  sendGetRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getMenubar),
    switchMap(() => this.menubarService.get()
      .pipe(
        mergeMap((response: any) => {
          return [
            receiveMenubar({ items: response.body }),
          ];
        }),
        catchError(error => {
          const unauthorizedCode = 401;
          if (error.status === unauthorizedCode) {
            return of(removeToken());
          }
          return of(receiveMenubar({ items: error }));
        }),
      ))));

  constructor(private actions$: Actions,
              private menubarService: MenubarService,) {
  }
}
