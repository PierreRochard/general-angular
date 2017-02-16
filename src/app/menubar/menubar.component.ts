import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {MenuItem} from 'primeng/primeng';

import * as fromRoot from '../reducers';


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarComponent {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = store.select(fromRoot.getSchema)
      .map(schema => {
        return Object.keys(schema.definitions).map(key => {
          let icon = 'fa-table';
          let path = '/';
          if (key.startsWith('(rpc')) {
            icon = 'fa-terminal';
            path += 'rpc/'
          }
          let formatted_key = key.replace('(rpc) ', '');
          return {'label': formatted_key,
                  'icon': icon,
                  'routerLink': [path + formatted_key]}})
      });
  }
}
