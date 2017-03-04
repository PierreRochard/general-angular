import {Component, OnDestroy} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {$WebSocket} from 'angular2-websocket/angular2-websocket';

import * as fromRoot from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `<h1>Table</h1>
              <div class="ui-g">
                <div class="ui-g-12">
                  <p-fieldset legend="Create">
                  <form-container></form-container>
                  </p-fieldset>
                </div>
                <div class="ui-g-12">
                  <p-fieldset legend="Read">
                  <table-datatable [data]="records$ | async"></table-datatable>
                  </p-fieldset>
                </div>
              </div>`
})
export class TableContainer implements OnDestroy {
  public records$: Observable<any[]>;
  private ws: $WebSocket;

  constructor(private store: Store<fromRoot.State>) {
    this.records$ = this.store.select(fromRoot.getRecords);
  }
  ngOnInit() {
    this.ws = new $WebSocket('ws://localhost:4545/' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoicnciLCJjaGFubmVsIjoibWVzc2FnZXNfdGFibGVfdXBkYXRlIn0.zZDpPodeBkvAfpmhq9YMLCAAzWk5WzlUwb9oa9M_Rvk');
    this.ws.getDataStream().subscribe(
      response => {
        console.log(response);
        return response.data;
      },
      error => console.log('Error: ' + error.message),
      () => console.log('Completed'),
    )
  }

  ngOnDestroy() {
    this.ws.close();
    console.log('WebSocket Closed');
  }
}

