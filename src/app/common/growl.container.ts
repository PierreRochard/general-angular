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
      return (response === null) ?
        []:
        [{severity: 'info',
          summary: response.status.toString() + ': ' + response.statusText,
          detail: response.json().message}]
    })
  }
}
