import { createSelector } from 'reselect';

import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {MenuItem} from 'primeng/primeng';

import * as fromRoot from '../app.reducers';
import {go} from "@ngrx/router-store";
import {RemoveTokenAction} from "../auth/auth.actions";


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarComponent {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = Observable.combineLatest(store.select(fromRoot.getPathNames), store.select(fromRoot.getToken),
      (pathNames, token) => pathNames.map(pathName => {

      let icon: string;
      if (pathName === '/') {
        icon = 'fa-home';
      } else if (pathName.startsWith('/rpc/')) {
        icon = 'fa-terminal';
      } else {
        icon = 'fa-table';
      }
      console.log(pathName);
      console.log(token);
      if (pathName === '/rpc/login' && !(token === '')) {
        return {
          label: 'Logout',
          icon: icon,
          command: () => store.dispatch(new RemoveTokenAction())
        };
      } else {
        return {
          label: pathName,
          icon: icon,
          command: () => store.dispatch(go([pathName])),
          // For some reason this is not working
          visible: (pathName === '/rpc/login') ? (token === '') : true,
        };
      }
    })
    );
  }
}
