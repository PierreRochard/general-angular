import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  ReceiveFormFieldSettingsAction,
  GetFormFieldSettingsAction, GetFormSettingsAction, ReceiveFormSettingsAction,
  GET_FORM_FIELD_SETTINGS, GET_FORM_SETTINGS, SELECT_FORM, SelectFormAction,
} from './form.actions';
import { FormService } from './form.service';
import { RouteParams } from '../router/router.models';


@Injectable()
export class FormEffects {

  
  selectForm$ = createEffect(() => this.actions$.pipe(
    ofType(SELECT_FORM),
    map((action: SelectFormAction) => action.payload),
    mergeMap((routeParams: RouteParams) => {
      return [
        new GetFormSettingsAction(routeParams),
        new GetFormFieldSettingsAction(routeParams),
      ];
    })));

  
  getFormSettings$ = createEffect(() => this.actions$.pipe(
    ofType(GET_FORM_SETTINGS),
    switchMap((action: GetFormSettingsAction) => {
      return this.formService.get_form_settings(action.payload.selectedSchemaName,
        action.payload.selectedObjectName).pipe(
        mergeMap((response: any) => {
          return [
            new ReceiveFormSettingsAction(response.body),
          ];
        }),
        catchError(error => {
          return of(new ReceiveFormSettingsAction(error));
        }),
      )
    })));

  
  getFormFieldSettings$ = createEffect(() => this.actions$.pipe(
    ofType(GET_FORM_FIELD_SETTINGS),
    switchMap((action: GetFormFieldSettingsAction) => {
      return this.formService.get_form_field_settings(action.payload.selectedSchemaName,
        action.payload.selectedObjectName).pipe(
        mergeMap((response: any) => {
          return [
            new ReceiveFormFieldSettingsAction(response.body),
          ];
        }),
        catchError(error => {
          return of(new ReceiveFormFieldSettingsAction(error));
        }),
      )
    })));


  constructor(private actions$: Actions,
              private formService: FormService) {
  }
}
