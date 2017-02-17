import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import {MenuItem} from 'primeng/primeng';

import * as fromRoot from '../reducers';


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>
<br>
<br>
<br>
{{items$ | async}}
`,
})
export class MenubarComponent {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = store.select(fromRoot.getEndpoints);
      // .map(endpoints => {
      //   return endpoints.map(endpoint => {
      //     let icon = 'fa-table';
      //     let path = '/';
      //     if (endpoint.startsWith('(rpc) ')) {
      //       icon = 'fa-terminal';
      //       path += 'rpc/'
      //     }
      //     let formatted_key = endpoint.replace('(rpc) ', '');
      //     return {'label': formatted_key,
      //             'icon': icon,
      //             'routerLink': [path + formatted_key]}})
      // });
  }
}
