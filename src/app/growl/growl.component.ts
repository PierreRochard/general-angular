import {Component, Input} from '@angular/core';

import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-growl-component',
  template: `<p-growl [value]="messages"
                      [sticky]="sticky"
                      [life]="life"></p-growl>`,
})
export class GrowlComponent {
  @Input() messages: Message[];

  sticky = false;
  life = 500;

}
