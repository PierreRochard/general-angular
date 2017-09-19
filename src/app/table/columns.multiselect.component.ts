// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { DatatableColumn, MultiselectOutput } from 'app/table/table.models';
// import { SelectItem } from 'primeng/primeng';
//
// @Component({
//   selector: 'app-columns-multiselect-component',
//   template: `
//     <p-multiSelect
//       [options]="columns"
//       [displaySelectedLabel]="false"
//       [defaultLabel]="defaultLabel"
//       [(ngModel)]="selectedColumns"
//     >
//     </p-multiSelect>
//   `
// })
// export class ColumnsMultiselectComponent {
//   public defaultLabel = 'Columns';
//
//   _selectedColumns: SelectItem[] = [];
//   @Input()
//   set selectedColumns(value: DatatableColumn[]) {
//     let filteredColumns: SelectItem[];
//     let removedColumns: DatatableColumn[];
//     let addedColumns: DatatableColumn[];
//     let columnsUpdate: MultiselectOutput;
//
//     if (typeof value[0] === 'string' || value.length === 0) {
//       addedColumns = value.filter(c => this._selectedColumns.indexOf(c) === -1);
//       removedColumns = this._selectedColumns.filter(c => value.indexOf(c) === -1);
//       columnsUpdate = {
//         added: addedColumns,
//         removed: removedColumns
//       };
//       this._selectedColumns = value;
//       this.onChange.emit(columnsUpdate);
//     } else {
//       filteredColumns = value.filter(c => c.is_visible).map(c => {
//         return {'label': c.custom_name, 'value': c.column_name}
//       });
//       this._selectedColumns = [...filteredColumns];
//     }
//   }
//
//   get selectedColumns() {
//     return this._selectedColumns
//   }
//
//   _columns: SelectItem[] = [];
//   @Input()
//   set columns(value: DatatableColumn[]) {
//     this._columns = value.map(c => {
//       return {'label': c.custom_name, 'value': c.column_name}
//     })
//   }
//
//   get columns():  SelectItem[]  {
//     return this._columns;
//   }
//
//   @Output() onChange = new EventEmitter<MultiselectOutput>();
// }
