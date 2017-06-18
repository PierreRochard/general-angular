import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {GetTableColumnSettingsAction} from './table.actions';
import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-component [tableRecords]="tableRecords$ | async"
                             [tableColumnSettings]="tableColumnSettings$ | async"
        >
        </app-table-component>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public selectedPathName$: Observable<string>;
  public tableRecords$: Observable<any[]>;
  public tableColumnSettings$: Observable<any[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.tableRecords$ = this.store.select(getRecords);

    this.tableColumnSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.tableColumnSettings),
        (pathName, tableColumnSettings) => {
          const tableName = pathName.split('/').pop();
          console.log(tableName);
          tableColumnSettings = tableColumnSettings.filter(columnSetting => {
            return columnSetting.table_name === tableName;
          });
          console.log(tableColumnSettings);
          if (tableColumnSettings.length === 0 ) {
            this.store.dispatch(new GetTableColumnSettingsAction(tableName))
          }
          return tableColumnSettings
        })
  }
}
