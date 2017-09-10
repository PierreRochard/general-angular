import {Action} from '@ngrx/store';

import {type} from '../util';

import {FormField} from './form.models';

export const FormActionTypes = {
  GET_FORM_FIELD_SETTINGS: type('GET_FORM_FIELD_SETTINGS'),
  GET_FORM_SETTINGS: type('GET_FORM_SETTINGS'),
  RECEIVE_FORM_FIELD_SETTINGS: type('RECEIVE_FORM_FIELD_SETTINGS'),
  RECEIVE_FORM_SETTINGS: type('RECEIVE_FORM_SETTINGS'),
};

export class GetFormFieldSettingsAction implements Action {
  type = FormActionTypes.GET_FORM_FIELD_SETTINGS;

  constructor(public payload: string) {
  }
}

export class GetFormSettingsAction implements Action {
  type = FormActionTypes.GET_FORM_SETTINGS;

  constructor(public payload: string) {
  }
}

export class ReceiveFormFieldSettingsAction implements Action {
  type = FormActionTypes.RECEIVE_FORM_FIELD_SETTINGS;

  constructor(public payload: FormField[]) {
  }
}

export class ReceiveFormSettingsAction implements Action {
  type = FormActionTypes.RECEIVE_FORM_SETTINGS;

  constructor(public payload: FormField[]) {
  }
}

export type FormActions =
    GetFormFieldSettingsAction
  | GetFormSettingsAction
  | ReceiveFormFieldSettingsAction
  | ReceiveFormSettingsAction;
