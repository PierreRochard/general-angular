import { createAction, props } from '@ngrx/store';
import { PostLoginRequestPayload } from './auth.models';

export const sendLoginPostRequest = createAction(
  '[Auth] Send Login Post Request',
  props<{ payload: PostLoginRequestPayload }>(),
);

export const addToken = createAction(
  '[Auth] Add Token',
  props<{ token: string }>(),
);

export const removeToken = createAction('[Auth] Remove Token');
