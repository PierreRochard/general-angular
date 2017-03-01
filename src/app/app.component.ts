import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<menubar></menubar>
             <growl></growl>
             <router-outlet></router-outlet>`,
})
export class AppComponent {
}
