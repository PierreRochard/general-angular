import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';

import {
  ReceiveFormFieldSettingsAction, FormActionTypes,
  GetFormFieldSettingsAction, GetFormSettingsAction, ReceiveFormSettingsAction,
} from './form.actions';
import {FormService} from './form.service';


@Injectable()
export class FormEffects {

  @Effect()
  getFormFieldSettings$ = this.actions$
    .ofType(FormActionTypes.GET_FORM_FIELD_SETTINGS)
    .switchMap((action: GetFormFieldSettingsAction) => this.formService.get_form_field_settings(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveFormFieldSettingsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveFormFieldSettingsAction(error));
      })
    );

  @Effect()
  getFormSettings$ = this.actions$
    .ofType(FormActionTypes.GET_FORM_SETTINGS)
    .switchMap((action: GetFormSettingsAction) => this.formService.get_form_settings(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveFormSettingsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveFormSettingsAction(error));
      })
    );

  constructor (
    private actions$: Actions,
    private formService: FormService,
  ) { }
}
