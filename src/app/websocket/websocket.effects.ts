import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';

import * as websocket from './websocket.actions';
import * as table from '../table/table.actions';

import * as fromRoot from '../app.reducers';

import { Store } from '@ngrx/store';
import { WebsocketService } from './websocket.service';

@Injectable()
export class WebsocketEffects {
  constructor(private actions$: Actions,
              private websocket$: WebsocketService,
              private store: Store<fromRoot.AppState>,) {
  }
}
