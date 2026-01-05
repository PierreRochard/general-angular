import { createAction, props } from '@ngrx/store';
import { RouteParams } from 'app/router/router.models';

import { Form, FormField } from './form.models';

export const getFormFieldSettings = createAction(
  '[Form] Get Form Field Settings',
  props<{ params: RouteParams }>(),
);

export const getFormSettings = createAction(
  '[Form] Get Form Settings',
  props<{ params: RouteParams }>(),
);

export const receiveFormFieldSettings = createAction(
  '[Form] Receive Form Field Settings',
  props<{ fields: FormField[] }>(),
);

export const receiveFormSettings = createAction(
  '[Form] Receive Form Settings',
  props<{ forms: Form[] }>(),
);

export const selectForm = createAction(
  '[Form] Select Form',
  props<{ params: RouteParams }>(),
);
