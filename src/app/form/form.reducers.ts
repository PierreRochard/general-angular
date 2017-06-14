import {FormActions, FormActionTypes} from './form.actions';

export interface FormState {
  formFieldSettings: any[];
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
