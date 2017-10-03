import {
  Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation,
} from '@angular/core';

import {
  ColumnResizeEvent, Datatable,
  DatatableColumn, DatatableUpdate, EditEvent,
  MultiselectOutput, RecordsUpdate, SuggestionsQuery,
} from 'app/table/table.models';
import { Column, DataTable } from 'primeng/primeng';

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

  @Input() suggestions: string[];
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

  archiveRow(event: any) {
    console.log(event);
  }

  get actionColumnStyles(): any {
    if (this.datatable.can_archive) {
      return {
        'height': '38px',
        'overflow': 'visible',
        'padding-top': '0px',
        'padding-bottom': '0px',
        'width': '120px',
      };
    } else {
      return null;
    }
  }

  get datatableWidth(): string {
    const columnWidths = [...this.columns, {
      is_visible: true,
      styles: this.actionColumnStyles,
    }].filter(c => c.is_visible)
      .map(c => Number(c.styles.width.slice(0, -2)));
    let totalColumnWidths = columnWidths.reduce(function (sum, value): number {
      return sum + value;
    }, 0.0);
    totalColumnWidths += 2;
    return totalColumnWidths.toString() + 'px'
  }

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
    event.tableName = this.datatable.table_name;
    event.schemaName = this.datatable.schema_name;
    if (event.first !== this.datatable.row_offset || event.rows !== this.datatable.row_limit) {
      this.onPagination.emit(event);
    }
    if (event.sortOrder !== this.datatable.sort_order || event.sortField !== this.datatable.sort_column) {
      this.onSort.emit(event);
    }
  }

  _onMultiselect(event: MultiselectOutput): void {
    event.tableName = this.datatable.table_name;
    this.onMultiselect.emit(event)
  }
}
