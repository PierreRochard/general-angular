import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {MenuItem} from 'primeng/primeng';

import {AppState, selectMenuItems} from '../app.reducers';


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarContainer {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<AppState>) {
    this.items$ = store.select(selectMenuItems);
  }
}
