import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {MenuItem} from 'primeng/primeng';

import {AppState} from '../app.reducers';
import {GetMenubarAction} from "./menubar.actions";


@Component({
  selector: 'app-menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarContainer implements OnInit {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.items$ = this.store.select(state => state.menubar.menuItems)
      .map(menuItems => {
        if ( menuItems === null ) {
          this.store.dispatch(new GetMenubarAction(null));
          return [];
        }
        return menuItems;
      });
  }
}
