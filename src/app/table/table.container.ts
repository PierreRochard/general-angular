import {Component} from '@angular/core';

import {Observable} from 'rxjs/observable';

import {Store} from '@ngrx/store';

import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `<div class="ui-g">
                <div class="ui-g-12">
                  <form-container></form-container>
                </div>
                <div class="ui-g-12">
                  <table-datatable [records]="records$ | async"
                                   >
                  </table-datatable>
                </div>
              </div>`
})
export class TableContainer {
  public records$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.records$ = this.store.select(getRecords);
  }
}

