import {Component} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {Message} from 'primeng/primeng';

import {AppState, getRestResponse} from '../app.reducers';


@Component({
  selector: 'app-growl-container',
  template: `<app-growl-component
                [messages]="messages$ | async">
              </app-growl-component>`,
})
export class GrowlContainer {
  messages$: Observable<Message[]>;

  constructor(private store: Store<AppState>) {
    this.messages$ = store.select(getRestResponse)
      .filter(response => response !== null)
      .map((response: any) => {
        let severity = 'info';
        let summary = '';
        let detail = '';
        let response_message = '';
        if (response) {
          response_message = response.message;
        }
        if (response.status === 0) {
          summary = 'Unable to connect to the API';
          severity = 'error';
        } else if (response.status >= 200 && response.status < 300) {
          summary = response.status.toString() + ': ' + response.statusText;
          detail = response_message;
          severity = 'success';
        } else if (response.status >= 400 && response.status < 600) {
          summary = response.status.toString() + ': ' + response.statusText;
          detail = response_message;
          severity = 'error';
        }
        return [{severity: severity,
                 summary: summary,
                 detail: detail}];
    });
  }
}
