import {
  Component, EventEmitter, Input, Output,
  ViewEncapsulation,
} from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import {
  DatatableColumn,
  DatatableUpdate,
  MultiselectOutput,
} from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  _records;
  @Input()
  set records(value: any[]) {
    this._records = JSON.parse(JSON.stringify(value));
  };

  get records() {
    return this._records;
  }

  @Input() rowLimit: number;
  @Input() rowOffset: number;
  @Input() sortColumn: string;
  @Input() sortOrder: number;
  @Input() tableName: string;
  @Input() totalRecords: number;

  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onEditComplete = new EventEmitter<any>();
  @Output() onFilterAdded = new EventEmitter<any>();
  @Output() onFilterRemoved = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<DatatableUpdate>();
  @Output() onSort = new EventEmitter<DatatableUpdate>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  _onColumnResize(event) {
    console.log(event);
  }

  _onEditCancel(event) {
    event.table_name = this.tableName;
    this.onEditCancel.emit(event);
  }

  _onEditComplete(field, value, row_id) {
    console.log(field);
    console.log(value);
    console.log(row_id);
    // this.onEditComplete.emit(event);
  }

  _onLazyLoad(event: DatatableUpdate) {
    event.tableName = this.tableName;
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

  _onMultiselect(event: MultiselectOutput) {
    event.tableName = this.tableName;
    this.onMultiselect.emit(event)
  }
}
