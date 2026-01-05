import { Form, FormField } from 'app/form/form.models';

import { createReducer, on } from '@ngrx/store';
import { receiveFormFieldSettings, receiveFormSettings, selectForm } from './form.actions';

export interface FormState {
  schemaName: string | null;
  formName: string | null;
  formSettings: Form | null;
  fieldSettings: FormField[];
}

export const initialState: FormState = {
  schemaName: null,
  formName: null,
  formSettings: null,
  fieldSettings: [],
};

export const formReducer = createReducer(
  initialState,
  on(selectForm, (state, { params }) => ({
    ...state,
    schemaName: params.selectedSchemaName,
    formName: params.selectedObjectName,
  })),
  on(receiveFormFieldSettings, (state, { fields }) => ({
    ...state,
    fieldSettings: fields,
  })),
  on(receiveFormSettings, (state, { forms }) => ({
    ...state,
    formSettings: forms[0],
  })),
);
