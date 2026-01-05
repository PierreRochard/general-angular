import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="page-shell">
      <app-menubar-container></app-menubar-container>
      <app-growl-container></app-growl-container>
      <router-outlet></router-outlet>
    </div>
  `,
    standalone: false
})
export class AppComponent {
}
