import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns } from 'app/table/table.models';

@Component({
  selector: 'app-columns-multiselect-component',
  template: `
    <p-multiSelect
      [options]="columns"
      [(ngModel)]="selectedCities">
    </p-multiSelect>
  `
})
export class ColumnsMultiselectComponent {
  @Input() columns: DatatableColumns[];

  @Output() onLazyLoad = new EventEmitter<any>();


}
