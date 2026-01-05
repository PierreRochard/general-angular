import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenubarComponent } from './menubar.component';
import { MenubarContainer } from './menubar.container';
import { MenubarService } from './menubar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
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
