import {
  Component, EventEmitter, Input, Output,
  ViewEncapsulation,
} from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import {
  ColumnResizeEvent, Datatable,
  DatatableColumn,
  DatatableUpdate,
  EditEvent,
  MultiselectOutput,
} from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  public options: SelectItem[] = [{label: '1', value: '1'}, {
    label: '2',
    value: '1',
  }];
  public dataKey = 'id';
  public paginator = true;
  public reorderableColumns = false;
  public resizableColumns = true;
  public rowsPerPage = [10, 20];
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';

  @Input() areRecordsLoading: boolean;
  @Input() columns: DatatableColumn[];
  @Input() datatable: Datatable;
  _records: any[];
  @Input()
  set records(value: any[]) {
    this._records = JSON.parse(JSON.stringify(value));
  };

  get records() {
    return this._records;
  }

  @Input() rowLimit: number;
  @Input() rowOffset: number;
  @Input() schemaName: string;
  @Input() sortColumn: string;
  @Input() sortOrder: number;
  @Input() tableName: string;
  @Input() totalRecords: number;

  @Output() onDropdownFocus = new EventEmitter<DatatableColumn>();
  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onEditComplete = new EventEmitter<any>();
  @Output() onFilterAdded = new EventEmitter<any>();
  @Output() onFilterRemoved = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<DatatableUpdate>();
  @Output() onSort = new EventEmitter<DatatableUpdate>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  _onColumnResize(event: ColumnResizeEvent): void {
    console.log(event);
  }
  
  _onEditCancel(event: EditEvent): void {
    event.table_name = this.tableName;
    this.onEditCancel.emit(event);
  }

  _onEditComplete(field: string, value: any, row_id: string): void {
    console.log(field);
    console.log(value);
    console.log(row_id);
    // this.onEditComplete.emit(event);
  }

  _onLazyLoad(event: DatatableUpdate): void {
    event.tableName = this.tableName;
    event.schemaName = this.schemaName;
    if (event.first !== this.rowOffset || event.rows !== this.rowLimit) {
      this.onPagination.emit(event);
    }
    if (event.sortOrder !== this.sortOrder || event.sortField !== this.sortColumn) {
      this.onSort.emit(event);
    }
    // TODO: WIP column filtering
    // const newFilteredColumns = Object.keys(event.filters);
    // const oldFilteredColumns = this.columns.filter(c => c.filter_value !== null && c.filter_value.length > 0).map(c => {
    //   return c.value
    // });
    // const addedFilters = newFilteredColumns.filter(c => oldFilteredColumns.indexOf(c) === -1)
    //   .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.table_name, filter_value: event.filters[c].value}));
    // const removedFilters = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) === -1)
    //   .map(c => this.onFilterRemoved.emit({column_name: c, table_name: this.table_name}));
    // const newFilterValues = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) > -1)
    //   .filter(c => event.filters[c].value !== this.columns.find(col => col.value === c).filter_value)
    //   .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.table_name, filter_value: event.filters[c].value}));
  }

  _onMultiselect(event: MultiselectOutput): void {
    event.tableName = this.tableName;
    this.onMultiselect.emit(event)
  }
}
