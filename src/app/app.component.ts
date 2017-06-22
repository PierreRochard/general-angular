import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-menubar-container></app-menubar-container>
             <app-growl-container></app-growl-container>
             <router-outlet></router-outlet>`,
})
export class AppComponent {
}
