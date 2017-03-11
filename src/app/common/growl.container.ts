import {Component} from "@angular/core";
import {Response} from "@angular/http";

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {Message} from "primeng/primeng";

import * as fromRoot from "../app.reducers";


@Component({
  selector: 'growl',
  template: `<p-growl [value]="messages$ | async"
                      [sticky]="false"
                      [life]="2000"></p-growl>`,
})
export class GrowlContainer {
  messages$: Observable<Message[]>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.messages$ = store.select(fromRoot.getResponse)
      .filter(response => response !== null)
      .map((response: Response) => {
        let severity = 'info';
        let summary = '';
        let detail = '';
        let response_message = '';
        if (response.json()) {
          response_message = response.json().message
        }
        if (response.status === 0) {
          summary = 'Unable to connect to the API';
          severity = 'error'
        } else if (response.status >= 200 && response.status < 300) {
          summary = response.status.toString() + ': ' + response.statusText;
          detail = response_message;
          severity = 'success';
        } else if (response.status >= 400 && response.status < 600) {
          summary = response.status.toString() + ': ' + response.statusText;
          detail = response_message;
          severity = 'error'
        }
        return [{severity: severity,
                 summary: summary,
                 detail: detail}]
    })
  }
}
