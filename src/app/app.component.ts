import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
       <app-menubar-container></app-menubar-container>
       <app-growl-container></app-growl-container>
       <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
}
