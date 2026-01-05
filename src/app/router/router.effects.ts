import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { back, forward, go } from './router.actions';


@Injectable()
export class RouterEffects {
  
  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(go),
    tap(({path, query: queryParams, extras}) => {
      return this.router.navigate(path, {queryParams, ...extras})
    })), {dispatch: false});

  
  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType(back),
    tap(() => this.location.back())), {dispatch: false});

  
  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType(forward),
    tap(() => this.location.forward())), {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}
