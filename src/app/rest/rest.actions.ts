import { createAction, props } from '@ngrx/store';

export const sendGetRequest = createAction(
  '[Rest] Send Get Request',
  props<{ schema: string; path: string }>(),
);

export const sendPostRequest = createAction(
  '[Rest] Send Post Request',
  props<{ schemaName: string; formName: string; data: any }>(),
);

export const sendDeleteRequest = createAction(
  '[Rest] Send Delete Request',
  props<{ schema: string; path: string; payload?: any }>(),
);

export const receivedResponse = createAction(
  '[Rest] Received Response',
  props<{ response: any }>(),
);
