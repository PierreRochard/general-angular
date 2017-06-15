import {FormActions, FormActionTypes} from './form.actions';

import {FormFieldSetting} from 'app/form/form.models';

export interface FormState {
  formFieldSettings: FormFieldSetting[];
}

const initialState: FormState = {
  formFieldSettings: [],
};

export function formReducer (state = initialState, action: FormActions): FormState {
  switch (action.type) {
    case FormActionTypes.RECEIVE_FORM_FIELD_SETTINGS:
      return Object.assign({}, state, {
        formFieldSettings: action.payload
      });
    default:
      return state;
  }
}
