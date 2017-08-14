import {FormActions, FormActionTypes} from './form.actions';

import {FormFieldSetting} from 'app/form/form.models';

export interface FormState {
  formSettings: any[];
  fieldSettings: FormFieldSetting[];
}

const initialState: FormState = {
  formSettings: [],
  fieldSettings: [],
};

export function formReducer (state = initialState, action: FormActions): FormState {
  console.log(action);
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
