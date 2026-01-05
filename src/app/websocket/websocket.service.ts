import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../app.reducers';
import { AddRecordAction, DeselectRecordAction, RemoveRecordAction } from '../table/table.actions';

@Injectable()
export class WebsocketService implements OnDestroy {
  private socket: WebSocket | null = null;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  connect(url: string) {
    if (this.socket) {
      this.socket.close();
    }
    this.socket = new WebSocket(url);

    fromEvent<MessageEvent>(this.socket, 'message')
      .pipe(
        takeUntil(this.destroy$),
        map((event: MessageEvent) => {
          try {
            return JSON.parse(event.data);
          } catch {
            return null;
          }
        })
      )
      .subscribe(message => {
        if (!message || !message.type) {
          return;
        }
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
      });

    fromEvent(this.socket, 'error')
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.socket) {
      this.socket.close();
    }
  }
}
