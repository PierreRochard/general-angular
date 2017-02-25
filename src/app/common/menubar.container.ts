import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {MenuItem} from 'primeng/primeng';

import * as fromRoot from '../app.reducers';
import {go} from "@ngrx/router-store";


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarComponent {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = store.select(fromRoot.getPathNames).map(pathNames => pathNames.map(pathName => {
      let icon: string;
      if (pathName === '/') {
        icon = 'fa-home';
      } else if (pathName.startsWith('/rpc/')) {
        icon = 'fa-terminal';
      } else {
        icon = 'fa-table';
      }
      return {
        label: pathName,
        icon: icon,
        command: () => store.dispatch(go([pathName]))
      }
    })
    );
  }
}
