import { Form, FormField } from 'app/form/form.models';

import {
  FormActions,
  RECEIVE_FORM_FIELD_SETTINGS,
  RECEIVE_FORM_SETTINGS,
  SELECT_FORM,
} from './form.actions';

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

export function formReducer(state = initialState, action: FormActions): FormState {
  switch (action.type) {
    case SELECT_FORM:
      return Object.assign({}, state, {
        schemaName: action.payload.selectedSchemaName,
        formName: action.payload.selectedObjectName,
      });
    case RECEIVE_FORM_FIELD_SETTINGS:
      return Object.assign({}, state, {
        fieldSettings: action.payload,
      });
    case RECEIVE_FORM_SETTINGS:
      console.log(action.payload[0]);
      return Object.assign({}, state, {
        formSettings: action.payload[0],
      });
    default:
      return state;
  }
}
