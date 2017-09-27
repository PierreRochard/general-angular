import { Component, Input } from '@angular/core';

import { MenuItem } from 'primeng/components/common/menuitem';


@Component({
  selector: 'app-menubar-component',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <p-menubar
          [model]="items">
        </p-menubar>
      </div>
    </div>
  `,
})
export class MenubarComponent {
  @Input() items: MenuItem[] = [];
}
