import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rpc-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:  `<h1>
                {{selectedPathName$ | async}}
              </h1>
              <form-container></form-container>`
})
export class RpcContainer { }
