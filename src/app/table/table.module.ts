import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableContainer } from './table.container';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { TableDataMappingComponent } from './table.data-mapping.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
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
