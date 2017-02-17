import '@ngrx/core/add/operator/select';

import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../../reducers';
import * as schema from '../../actions/schema.actions';

@Component({
  template: `
                <h1>RPC {{endpointName | async}} Endpoint</h1>
                {{requiredFields$ | async}}
                `
})
export class RpcEndpointComponent {
  endpointName: Observable<string>;
  requiredFields$: Observable<any>;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.endpointName = route.params.select<string>('endpointName');
    this.requiredFields$ = store.select(fromRoot.getSchema)
      .map(schema => {
        this.endpointName.subscribe(data => {
          console.log(data);

        });
        // return Object.keys(schema.definitions[this.endpointName.subscribe(data => '(rpc) ' + data)].properties)
      }
      )
  }
}
