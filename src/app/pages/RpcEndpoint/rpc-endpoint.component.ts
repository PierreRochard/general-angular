import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../../reducers';
import * as schema from '../../actions/schema.actions';

@Component({
  template: `
                <h1>RPC {{endpointName | async}} Endpoint</h1>
                
                `
})
export class RpcEndpointComponent {
  endpointName: Observable<string>;
  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.endpointName = route.params['endpointName']
  }
}
