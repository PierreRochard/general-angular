import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { getMenubar } from './menubar.actions';
import { menubarLoadingState } from './menubar.constants';
import { MenuEntry } from './menubar.models';
import { selectMenuItems } from './menubar.selectors';


@Component({
    selector: 'app-menubar-container',
    template: `
    <app-menubar-component
      [items]="items$ | async"
    >
    </app-menubar-component>
  `,
    standalone: false
})
export class MenubarContainer implements OnInit {
  items$: Observable<MenuEntry[] | null>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.items$ = this.store.select(selectMenuItems)
      .pipe(map(menuItems => {
        if (menuItems === null) {
          this.store.dispatch(getMenubar());
          return menubarLoadingState;
        }
        return menuItems;
      }));
  }
}
