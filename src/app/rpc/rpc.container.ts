import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rpc-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:  `
    <form-container></form-container>`
})
export class RpcContainer { }
