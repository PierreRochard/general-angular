import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {Observable} from 'rxjs/observable';

import * as websocket from './websocket.actions';
import * as table from '../table/table.actions';

import * as fromRoot from '../app.reducers';

import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Store} from '@ngrx/store';
import {WebsocketService} from './websocket.service';

@Injectable()
export class WebsocketEffects {
  private ws: $WebSocket;
  constructor (
    private actions$: Actions,
    private websocket$: WebsocketService,
    private store: Store<fromRoot.AppState>,
  ) { }

  // @Effect()
  // connect$ = this.actions$
  //   .ofType(websocket.ActionTypes.CONNECT)
  //   .switchMap(action => [this.websocket$.connect('ws://localhost:4545/' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoicnciLCJjaGFubmVsIjoibWVzc2FnZXNfdGFibGVfdXBkYXRlIn0.zZDpPodeBkvAfpmhq9YMLCAAzWk5WzlUwb9oa9M_Rvk')]
  //   )
}
