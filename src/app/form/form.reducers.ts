import {FormActions, FormActionTypes} from './form.actions';

import { Form, FormField } from 'app/form/form.models';

export interface FormState {
  schemaName: string;
  formName: string;
  formSettings: Form;
  fieldSettings: FormField[];
}

const initialState: FormState = {
  schemaName: null,
  formName: null,
  formSettings: null,
  fieldSettings: [],
};

export function formReducer (state = initialState, action: FormActions): FormState {
  switch (action.type) {
    case FormActionTypes.RECEIVE_FORM_FIELD_SETTINGS:
      return Object.assign({}, state, {
        fieldSettings: action.payload
      });
    case FormActionTypes.RECEIVE_FORM_SETTINGS:
      return Object.assign({}, state, {
        formSettings: action.payload
      });
    default:
      return state;
  }
}
