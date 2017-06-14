import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';

import {AppState, getRouterState} from '../app.reducers';
import {Observable} from 'rxjs/observable';


@Component({
  selector: 'app-path-container',
  template: `
    <div [ngSwitch]="pathNameLength$ | async">
      <app-home-container *ngSwitchCase="0"></app-home-container>
      <table-container *ngSwitchCase="1"></table-container>
      <app-form-container *ngSwitchCase="2"></app-form-container>
    </div>
  `
})
export class PathContainer implements OnInit {
  pathNameLength$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.pathNameLength$ = this.store.select(getRouterState)
      .map(state => state.path.split('/')
        .filter(part => part.length > 0).length);
  }
}
