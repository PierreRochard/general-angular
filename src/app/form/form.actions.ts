import { Action } from '@ngrx/store';

import { RouteParams } from 'app/router/router.models';

import { Form, FormField } from './form.models';


export const GET_FORM_FIELD_SETTINGS = '[Form] Get Form Field Settings';
export const GET_FORM_SETTINGS = '[Form] Get Form Settings';
export const RECEIVE_FORM_FIELD_SETTINGS = '[Form] Receive Form Field Settings';
export const RECEIVE_FORM_SETTINGS = '[Form] Receive Form Settings';
export const SELECT_FORM = '[Form] Select Form';

export class GetFormFieldSettingsAction implements Action {
  readonly type = GET_FORM_FIELD_SETTINGS;

  constructor(public payload: RouteParams) {
  }
}

export class GetFormSettingsAction implements Action {
  readonly type = GET_FORM_SETTINGS;

  constructor(public payload: RouteParams) {
  }
}

export class ReceiveFormFieldSettingsAction implements Action {
  readonly type = RECEIVE_FORM_FIELD_SETTINGS;

  constructor(public payload: FormField[]) {
  }
}

export class ReceiveFormSettingsAction implements Action {
  readonly type = RECEIVE_FORM_SETTINGS;

  constructor(public payload: Form[]) {
  }
}

export class SelectFormAction implements Action {
  readonly type = SELECT_FORM;

  constructor(public payload: RouteParams) {
  }
}

export type FormActions =
  GetFormFieldSettingsAction
  | GetFormSettingsAction
  | ReceiveFormFieldSettingsAction
  | ReceiveFormSettingsAction
  | SelectFormAction;
