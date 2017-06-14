import {Component} from '@angular/core';

import {Observable} from 'rxjs/observable';

import {Store} from '@ngrx/store';

import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-form-container></app-form-container>
      </div>
      <div class="ui-g-12">
        <table-datatable [records]="records$ | async"
                         [columnSettings]="columnSettings$ | async"
        >
        </table-datatable>
      </div>
    </div>`
})
export class TableContainer {
  public records$: Observable<any[]>;
  public columnSettings$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.records$ = this.store.select(getRecords);
    this.columnSettings$ = this.store.select(getRecords);
  }
}

