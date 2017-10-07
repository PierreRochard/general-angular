import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { ButtonModule } from 'primeng/components/button/button';
import { ContextMenuModule } from 'primeng/components/contextmenu/contextmenu';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { PasswordModule } from 'primeng/components/password/password';

import { TableContainer } from './table.container';
import { TableComponent } from './table.component';
import { TableService } from './table.service';

@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    ContextMenuModule,
    DataTableModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
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
export class AppTableModule {
}
