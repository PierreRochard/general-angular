import { createAction, props } from '@ngrx/store';

import { GeneralMenuItem } from 'app/menubar/menubar.models';

export const getMenubar = createAction('[Menubar] Get Menubar');
export const receiveMenubar = createAction('[Menubar] Receive Menubar', props<{ items: GeneralMenuItem[] }>());
