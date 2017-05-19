import {Component} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {Message} from 'primeng/primeng';

import {AppState, getRestResponse} from '../app.reducers';


@Component({
  selector: 'growl',
  template: `<p-growl [value]="messages$ | async"
                      [sticky]="sticky"
                      [life]="life"></p-growl>`,
})
export class GrowlContainer {
  sticky = false;
  life = 2000;
  messages$: Observable<Message[]>;

  constructor(private store: Store<AppState>) {
    this.messages$ = store.select(getRestResponse)
      .filter(response => response !== null)
      .map((response: Response) => {
        let severity = 'info';
        let summary = '';
        let detail = '';
        let response_message = '';
        if (response.json()) {
          response_message = response.json().message;
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
