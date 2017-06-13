import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-menubar></app-menubar>
             <growl></growl>
             <router-outlet></router-outlet>`,
})
export class AppComponent {
}
