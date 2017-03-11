import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {Subscription} from "rxjs";
import * as table from '../table/table.actions';


@Injectable()
export class WebsocketService {
  private ws: $WebSocket;
  private subscriptions: Subscription;

  constructor(private store: Store<fromRoot.AppState>) {
    this.store.select(fromRoot.getRecords);
  };

  connect(url) {
    this.ws = new $WebSocket(url);
    const datastream = this.ws.getDataStream()
      .subscribe(
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
    return datastream
  }
}
