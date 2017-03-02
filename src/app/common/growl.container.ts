import {Component} from "@angular/core";
import {Response} from "@angular/http";

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {Message} from "primeng/primeng";

import * as fromRoot from "../app.reducers";


@Component({
  selector: 'growl',
  template: `<p-growl [value]="messages$ | async"
                      [sticky]="true"></p-growl>`,
})
export class GrowlContainer {
  messages$: Observable<Message[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.messages$ = store.select(fromRoot.getResponse).map((response: Response) => {
      if (response == null) {
        return [];
      }
      let severity = 'info';
      let summary = '';
      let detail = '';
      if (response.status === 0) {
        summary = 'Unable to connect to the API';
        severity = 'error'
      } else if (response.status >= 200 && response.status < 300) {
        summary = response.status.toString() + ': ' + response.statusText;
        detail = response.json().message;
        severity = 'success';
      } else if (response.status >= 400 && response.status < 600) {
        summary = response.status.toString() + ': ' + response.statusText;
        detail = response.json().message;
        severity = 'error'
      }
      return [{severity: severity,
               summary: summary,
               detail: detail}]
    })
  }
}
