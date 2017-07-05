import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns, MultiselectOutput } from 'app/table/table.models';

@Component({
  selector: 'app-columns-multiselect-component',
  template: `
    <p-multiSelect
      [options]="columns"
      [displaySelectedLabel]="false"
      [defaultLabel]="defaultLabel"
      [(ngModel)]="selectedColumns"
    >
    </p-multiSelect>
  `
})
export class ColumnsMultiselectComponent {
  public defaultLabel = 'Columns';

  _selectedColumns = [];
  @Input() set selectedColumns(value: any) {
    let filteredColumns: string[];
    let removedColumns: string[];
    let addedColumns: string[];
    let columnsUpdate: MultiselectOutput;

    if (typeof value[0] === 'string' || value.length === 0) {
      addedColumns = value.filter(c => this._selectedColumns.indexOf(c) === -1);
      removedColumns = this._selectedColumns.filter(c => value.indexOf(c) === -1);
      columnsUpdate = {
        added: addedColumns,
        removed: removedColumns
      };
      this._selectedColumns = value;
      this.onChange.emit(columnsUpdate);
    } else {
      filteredColumns = value.filter(c => c.is_visible).map(c => c.value);
      this._selectedColumns = [...filteredColumns];
    }
  }
  get selectedColumns() {
    return this._selectedColumns
  }

  @Input() columns: DatatableColumns[];

  @Output() onChange = new EventEmitter<MultiselectOutput>();
}
