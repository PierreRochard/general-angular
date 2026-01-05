import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  getFormFieldSettings,
  getFormSettings,
  receiveFormFieldSettings,
  receiveFormSettings,
  selectForm,
} from './form.actions';
import { FormService } from './form.service';
import { RouteParams } from '../router/router.models';


@Injectable()
export class FormEffects {

  selectForm$ = createEffect(() => this.actions$.pipe(
    ofType(selectForm),
    map(action => action.params),
    mergeMap((routeParams: RouteParams) => {
      return [
        getFormSettings({ params: routeParams }),
        getFormFieldSettings({ params: routeParams }),
      ];
    })));

  getFormSettings$ = createEffect(() => this.actions$.pipe(
    ofType(getFormSettings),
    switchMap((action) => {
      return this.formService.get_form_settings(action.params.selectedSchemaName,
        action.params.selectedObjectName).pipe(
        mergeMap((response: any) => {
          return [
            receiveFormSettings({ forms: response.body }),
          ];
        }),
        catchError(error => {
          return of(receiveFormSettings({ forms: error }));
        }),
      )
    })));

  getFormFieldSettings$ = createEffect(() => this.actions$.pipe(
    ofType(getFormFieldSettings),
    switchMap((action) => {
      return this.formService.get_form_field_settings(action.params.selectedSchemaName,
        action.params.selectedObjectName).pipe(
        mergeMap((response: any) => {
          return [
            receiveFormFieldSettings({ fields: response.body }),
          ];
        }),
        catchError(error => {
          return of(receiveFormFieldSettings({ fields: error }));
        }),
      )
    })));


  constructor(private actions$: Actions,
              private formService: FormService) {
  }
}
