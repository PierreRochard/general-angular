import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../app.reducers';
import {AddRecordAction, DeselectRecordAction, RemoveRecordAction} from '../table/table.actions';


@Injectable()
export class WebsocketService {
  private ws: $WebSocket;

  constructor(private store: Store<AppState>) {
    // this.store.select(getRecords);
  };

  connect(url) {
    this.ws = new $WebSocket(url);
    return this.ws.getDataStream()
      .subscribe(
        response => {
          const message = JSON.parse(response.data);
          switch (message.type) {
            case 'INSERT':
              this.store.dispatch(new AddRecordAction(message.row));
              break;
            case 'DELETE':
              this.store.dispatch(new RemoveRecordAction(message.row));
              this.store.dispatch(new DeselectRecordAction(message.row));
              break;
            default:
              break;
          }
        },
        error => console.log('Error: ' + error.message),
        () => console.log('Completed'),
      );
  }
}
