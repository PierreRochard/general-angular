import { Component, Input, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/primeng';


@Component({
  selector: 'app-menubar-component',
  template: `<p-menubar
              *ngIf="items.length > 0"
              [model]="items">
             </p-menubar>`,
})
export class MenubarComponent {
  @Input() items: MenuItem[];
}
