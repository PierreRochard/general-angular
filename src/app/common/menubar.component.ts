import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {MenuItem} from 'primeng/primeng';

import * as fromRoot from '../app.reducers';


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
export class MenubarComponent {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = store.select(fromRoot.getMenuItems);
  }
}
