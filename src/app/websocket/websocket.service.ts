import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {AppState, getRecords} from '../app.reducers';
import {Subscription} from "rxjs";
import {AddRecordAction, DeselectRecordAction, RemoveRecordAction} from '../table/table.actions';


@Injectable()
export class WebsocketService {
  private ws: $WebSocket;
  private subscriptions: Subscription;

  constructor(private store: Store<AppState>) {
    this.store.select(getRecords);
  };

  connect(url) {
    this.ws = new $WebSocket(url);
    const datastream = this.ws.getDataStream()
      .subscribe(
      response => {
        let message = JSON.parse(response.data);
        switch (message.type) {
          case 'INSERT':
            this.store.dispatch(new AddRecordAction(message.row));
            break;
          case 'DELETE':
            this.store.dispatch(new RemoveRecordAction(message.row));
            this.store.dispatch(new DeselectRecordAction(message.row));
            break;
        }
      },
      error => console.log('Error: ' + error.message),
      () => console.log('Completed'),
    );
    return datastream
  }
}
