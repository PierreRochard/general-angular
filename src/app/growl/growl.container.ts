import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {Store} from '@ngrx/store';

import {AppState, getRestResponse} from '../app.reducers';
import { GrowlMessage } from './growl.component';


@Component({
  selector: 'app-growl-container',
  template: `<app-growl-component
                [messages]="messages$ | async">
              </app-growl-component>`,
})
export class GrowlContainer {
  messages$: Observable<GrowlMessage[]>;

  constructor(private store: Store<AppState>) {
    this.messages$ = store.select(getRestResponse)
      .pipe(
        filter(response => response !== null),
        map((response: any) => {
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
    }));
  }
}
