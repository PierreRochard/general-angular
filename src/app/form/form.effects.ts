import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';

import {
  ReceiveFormFieldSettingsAction,
  GetFormFieldSettingsAction, GetFormSettingsAction, ReceiveFormSettingsAction,
  GET_FORM_FIELD_SETTINGS, GET_FORM_SETTINGS, SELECT_FORM, SelectFormAction,
} from './form.actions';
import { FormService } from './form.service';
import { RouteParams } from '../router/router.models';


@Injectable()
export class FormEffects {

  @Effect()
  selectForm$ = this.actions$
    .ofType(SELECT_FORM)
    .map((action: SelectFormAction) => action.payload)
    .mergeMap((routeParams: RouteParams) => {
      return [
        new GetFormSettingsAction(routeParams),
        new GetFormFieldSettingsAction(routeParams),
      ];
    });

  @Effect()
  getFormSettings$ = this.actions$
    .ofType(GET_FORM_SETTINGS)
    .switchMap((action: GetFormSettingsAction) => {
      return this.formService.get_form_settings(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap((response: any) => {
          return [
            new ReceiveFormSettingsAction(response.body),
          ];
        })
        .catch(error => {
          return of(new ReceiveFormSettingsAction(error));
        })
    });

  @Effect()
  getFormFieldSettings$ = this.actions$
    .ofType(GET_FORM_FIELD_SETTINGS)
    .switchMap((action: GetFormFieldSettingsAction) => {
      return this.formService.get_form_field_settings(action.payload.selectedSchemaName,
        action.payload.selectedObjectName)
        .mergeMap((response: any) => {
          return [
            new ReceiveFormFieldSettingsAction(response.body),
          ];
        })
        .catch(error => {
          return of(new ReceiveFormFieldSettingsAction(error));
        })
    });


  constructor(private actions$: Actions,
              private formService: FormService) {
  }
}
