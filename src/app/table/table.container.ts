import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/observable';

import {Store} from '@ngrx/store';

import {GetTableColumnSettingsAction} from './table.actions';
import {AppState, getRecords} from '../app.reducers';

@Component({
  selector: 'app-table-container',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <app-table-datatable [records]="tableRecords$ | async"
                             [tableColumnSettings]="tableColumnSettings$ | async"
        >
        </app-table-datatable>
      </div>
    </div>`
})
export class TableContainer implements OnInit {
  public selectedPathName$: Observable<string>;
  public tableRecords$: Observable<any[]>;
  public tableColumnSettings$: Observable<any[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(){
    this.selectedPathName$ = this.store.select(state => state.router.path);
    this.tableRecords$ = this.store.select(getRecords);

    this.tableColumnSettings$ = Observable
      .combineLatest(this.selectedPathName$,
        this.store.select(state => state.table.tableColumnSettings),
        (pathName, tableColumnSettings) => {
          const tableName = pathName.split('/').pop();
          tableColumnSettings = tableColumnSettings.filter(columnSetting => {
            return columnSetting.table_name === tableName;
          });
          if (tableColumnSettings.length === 0 ) {
            this.store.dispatch(new GetTableColumnSettingsAction(tableName))
          }
          return tableColumnSettings
        })
  }
}
