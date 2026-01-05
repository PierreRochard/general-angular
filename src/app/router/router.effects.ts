import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { BACK, FORWARD, GO, Go } from './router.actions';


@Injectable()
export class RouterEffects {
  
  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(GO),
    map((action: Go) => action.payload),
    tap(({path, query: queryParams, extras}) => {
      return this.router.navigate(path, {queryParams, ...extras})
    })), {dispatch: false});

  
  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType(BACK),
    tap(() => this.location.back())), {dispatch: false});

  
  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType(FORWARD),
    tap(() => this.location.forward())), {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}
