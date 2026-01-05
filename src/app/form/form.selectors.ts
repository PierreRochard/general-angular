import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.reducers';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormSettings = createSelector(
  selectFormState,
  state => state.formSettings,
);

export const selectFormFieldSettings = createSelector(
  selectFormState,
  state => state.fieldSettings,
);

export const selectFormName = createSelector(
  selectFormState,
  state => state.formName,
);
