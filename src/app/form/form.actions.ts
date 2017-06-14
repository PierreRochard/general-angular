import {Action} from '@ngrx/store';

import {type} from '../util';

export const FormActionTypes = {
  GET_FORM_FIELD_SETTINGS:     type('GET_FORM_FIELD_SETTINGS'),
  RECEIVE_FORM_FIELD_SETTINGS:  type('RECEIVE_FORM_FIELD_SETTINGS'),
};

export class GetFormFieldSettingsAction implements Action {
  type = FormActionTypes.GET_FORM_FIELD_SETTINGS;
  constructor(public payload: string) { }
}

export class ReceiveFormFieldSettingsAction implements Action {
  type = FormActionTypes.RECEIVE_FORM_FIELD_SETTINGS;
  constructor(public payload: any) {}
}

export type FormActions = GetFormFieldSettingsAction | ReceiveFormFieldSettingsAction;
