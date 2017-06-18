import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/components/button/button';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {PasswordModule} from 'primeng/components/password/password';

import {TableContainer} from './table.container';
import {TableComponent} from './table.component';
import {TableService} from './table.service';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    DataTableModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TableComponent,
    TableContainer,
  ],
  providers: [
    TableService,
  ],
  exports: [
    TableContainer,
  ]
})
export class AppTableModule {}
