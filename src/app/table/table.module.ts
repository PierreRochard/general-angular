import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { PasswordModule } from 'primeng/components/password/password';

import { TableContainer } from './table.container';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { ColumnsMultiselectComponent } from './columns.multiselect.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    DataTableModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ColumnsMultiselectComponent,
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
export class AppTableModule {
}
