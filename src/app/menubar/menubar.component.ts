import { Component, Input } from '@angular/core';

import { MenuItem } from 'primeng/components/common/menuitem';


@Component({
  selector: 'app-menubar-component',
  template: `
    <p-menubar
      [model]="items">
    </p-menubar>`,
})
export class MenubarComponent {
  @Input() items: MenuItem[] = [];
}
