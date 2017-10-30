import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { PasswordModule } from 'primeng/components/password/password';

import { TableContainer } from './table.container';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { TableDataMappingComponent } from './table.data-mapping.component';

@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    DataTableModule,
    FieldsetModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TableComponent,
    TableContainer,
    TableDataMappingComponent
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
