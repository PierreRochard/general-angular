import {
  Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation,
} from '@angular/core';

import {
  ColumnResizeEvent, Datatable,
  DatatableColumn,
  DatatableUpdate, EditEvent,
  MultiselectOutput, RecordsUpdate,
  SuggestionsQuery,
} from 'app/table/table.models';
import { Column, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  public columnStyle: any = {
    'overflow': 'visible',
    'height': '38px',
    'padding-top': '0px',
    'padding-bottom': '0px',
  };
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
  @Input() suggestions: string[];
  @Input() tableName: string;
  @Input() totalRecords: number;

  @Output() getSuggestions = new EventEmitter<SuggestionsQuery>();
  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onEditComplete = new EventEmitter<RecordsUpdate>();
  @Output() onFilterAdded = new EventEmitter<any>();
  @Output() onFilterRemoved = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<DatatableUpdate>();
  @Output() onSort = new EventEmitter<DatatableUpdate>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  @ViewChild('dt') dt: DataTable;

  onCellEditorKeydown(event: any, column: Column, rowData: any, rowIndex: number) {
    if (this.dt.editable) {
      this.dt.onEdit.emit({
        originalEvent: event,
        column: column,
        data: rowData,
        index: rowIndex,
      });

      if (event.keyCode === 13) { // enter
        this.dt.onEditComplete.emit({
          column: column,
          data: rowData,
          index: rowIndex,
        });
        if (event.shiftKey) {
          this.dt.moveToPreviousCell(event);
        } else {
          this.dt.moveToNextCell(event);
        }
      } else if (event.keyCode === 27) { // escape
        this.dt.onEditCancel.emit({
          column: column,
          data: rowData,
          index: rowIndex,
        });
        this.dt.domHandler.invokeElementMethod(event.target, 'blur');
        this.dt.switchCellToViewMode(event.target);
        event.preventDefault();
      } else if (event.keyCode === 9) { // tab
        this.dt.onEditComplete.emit({
          column: column,
          data: rowData,
          index: rowIndex,
        });
        if (event.shiftKey) {
          this.dt.moveToPreviousCell(event);
        } else {
          this.dt.moveToNextCell(event);
        }
      }
    }
  }

  updateRecord(event: EditEvent) {
    const update: RecordsUpdate = {
      value: event.data[event.column.field],
      record_id: event.data['id'],
      column_name: event.column.field,
      table_name: this.datatable.table_name,
      schema_name: this.datatable.schema_name,
    };
    this.onEditComplete.emit(update);
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
