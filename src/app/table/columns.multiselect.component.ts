import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns } from 'app/table/table.models';

@Component({
  selector: 'app-columns-multiselect-component',
  template: `
    <p-multiSelect
      [options]="columns"
      [(ngModel)]="selectedColumns"
      (onChange)="onChange.emit($event)">
    </p-multiSelect>
  `
})
export class ColumnsMultiselectComponent {
  _selectedColumns;
  @Input() set selectedColumns(value: DatatableColumns[]) {
    let selected_columns: string[];
    selected_columns = value.filter(c => c.is_visible).map(c => c.value);
    this._selectedColumns = [...selected_columns];
  }
  get selectedColumns() {
    return this._selectedColumns
  }

  @Input() columns: DatatableColumns[];

  @Output() onChange = new EventEmitter<any>();
}
