import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/primeng';

import { MenubarContainer } from './menubar.container';
import { MenubarService } from './menubar.service';
import { MenubarComponent } from './menubar.component';

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
  ],
  declarations: [
    MenubarComponent,
    MenubarContainer,
  ],
  providers: [
    MenubarService,
  ],
  exports: [
    MenubarContainer,
  ]
})
export class AppMenubarModule { }
