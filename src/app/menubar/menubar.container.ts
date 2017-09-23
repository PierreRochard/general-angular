import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { MenuItem } from 'primeng/primeng';

import { AppState } from '../app.reducers';
import { GetMenubarAction } from './menubar.actions';
import { menubarLoadingState } from './menubar.constants';


@Component({
  selector: 'app-menubar-container',
  template: `
    <app-menubar-component
      [items]="items$ | async"
    >
    </app-menubar-component>
  `,
})
export class MenubarContainer implements OnInit {
  items$: Observable<MenuItem[] | null>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.items$ = this.store.select(state => state.menubar.menuItems)
      .map(menuItems => {
        if (menuItems === null) {
          this.store.dispatch(new GetMenubarAction());
          return menubarLoadingState;
        }
        return menuItems;
      });
  }
}
