import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';

import {ReceiveFormFieldSettingsAction, FormActionTypes} from './form.actions';
import {FormService} from './form.service';


@Injectable()
export class FormEffects {

  @Effect()
  sendGetRequest$ = this.actions$
    .ofType(FormActionTypes.GET_FORM_FIELD_SETTINGS)
    .switchMap(action => this.formService.get_form_field_settings(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveFormFieldSettingsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveFormFieldSettingsAction(error));
      })
    );
  constructor (
    private actions$: Actions,
    private formService: FormService,
  ) { }
}
