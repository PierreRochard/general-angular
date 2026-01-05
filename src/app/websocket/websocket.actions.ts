import { createAction, props } from '@ngrx/store';

export const connectWebsocket = createAction(
  '[Websocket] Connect',
  props<{ url: string }>(),
);
