import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';
import 'rxjs/add/operator/withLatestFrom';

import * as websocket from './websocket.actions';
import * as table from '../table/table.actions';

import * as fromRoot from '../app.reducers';

import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Store} from "@ngrx/store";

@Injectable()
export class WebsocketEffects {
  private ws: $WebSocket;
  constructor (
    private actions$: Actions,
    private store: Store<fromRoot.State>,
  ) { }

  @Effect()
  connect$ = this.actions$
    .ofType(websocket.ActionTypes.CONNECT)
    .switchMap(action => {
      this.ws = new $WebSocket('ws://localhost:4545/' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoicnciLCJjaGFubmVsIjoibWVzc2FnZXNfdGFibGVfdXBkYXRlIn0.zZDpPodeBkvAfpmhq9YMLCAAzWk5WzlUwb9oa9M_Rvk');
      this.ws.getDataStream().subscribe(
        response => {
          let message = JSON.parse(response.data);
          switch (message.type) {
            case 'INSERT':
              this.store.dispatch(new table.AddRecordAction(message.row));
              break;
            case 'DELETE':
              this.store.dispatch(new table.RemoveRecordAction(message.row));
              this.store.dispatch(new table.DeselectRecordAction(message.row));
              break;
          }
        },
        error => console.log('Error: ' + error.message),
        () => console.log('Completed'),
      );
      return []
      });
}
