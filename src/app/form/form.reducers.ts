import {FormActions, FormActionTypes} from './form.actions';

import {FormFieldSetting} from 'app/form/form.models';

export interface FormState {
  fields: FormFieldSetting[];
}

const initialState: FormState = {
  fields: [],
};

export function formReducer (state = initialState, action: FormActions): FormState {
  switch (action.type) {
    case FormActionTypes.RECEIVE_FORM_FIELD_SETTINGS:
      return Object.assign({}, state, {
        fields: action.payload
      });
    default:
      return state;
  }
}
