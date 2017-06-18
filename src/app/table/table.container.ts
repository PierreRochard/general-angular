import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/observable';

import {Store} from '@ngrx/store';

import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <table-datatable [records]="records$ | async"
                         [columnSettings]="columnSettings$ | async"
        >
        </table-datatable>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public records$: Observable<any[]>;
  public columnSettings$: Observable<any[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(){
    this.records$ = this.store.select(getRecords);
    this.columnSettings$ = this.store.select(getRecords);
  }
}
