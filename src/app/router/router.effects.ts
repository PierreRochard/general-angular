import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';

import { BACK, FORWARD, GO, Go } from './router.actions';


@Injectable()
export class RouterEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.ofType(GO)
    .map((action: Go) => action.payload)
    .do(({path, query: queryParams, extras}) => {
      return this.router.navigate(path, {queryParams, ...extras})
    });

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.ofType(BACK)
    .do(() => this.location.back());

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.ofType(FORWARD)
    .do(() => this.location.forward());

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}
