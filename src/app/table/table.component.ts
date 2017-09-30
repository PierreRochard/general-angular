import {
  Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import {
  ColumnResizeEvent, Datatable,
  DatatableColumn,
  DatatableUpdate,
  MultiselectOutput,
} from 'app/table/table.models';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
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
  @Input() selectItems: SelectItem[];
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

  @ViewChildren('autocomplete') autoComplete: QueryList<AutoComplete>;
  @ViewChild('dt') dt: DataTable;

  onKeyUp(event: any, col: any, rowData: any, rowIndex: any) {
    console.log(event);
    if (event.keyCode === 27) {
      this.dt.onCellEditorKeydown(event, col, rowData, rowIndex)
    }
  }

  updateRecord(event: any) {
    console.log('updateRecord', JSON.stringify(event));
    this.onEditComplete.emit(event);
  }

  selectItemValue(label: string) {
    const selectItem = this.selectItems.filter((s: SelectItem) => s.label === label);
    if (selectItem.length) {
      return selectItem[0].value;
    } else {
      return null
    }
  }

  _onColumnResize(event: ColumnResizeEvent): void {
    console.log(event);
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
