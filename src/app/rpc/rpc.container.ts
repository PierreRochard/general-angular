import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';



import * as fromRoot from '../app.reducers';
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'rpc-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<h1>
  {{selectedPathName$ | async}}
</h1>
<form-component></form-component>
  `
})
export class RpcContainer {

}
