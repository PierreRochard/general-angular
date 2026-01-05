import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import {
  Datatable,
  DatatableColumn,
  DatatableUpdate,
  EditEvent,
  MultiselectOutput,
  DeleteRecord,
  UpdateRecord,
  SuggestionsQuery,
} from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges {
  @Input() areRecordsLoading = false;
  @Input() columns: DatatableColumn[] = [];
  @Input() datatable: Datatable;
  private _records: any[] = [];
  @Input()
  set records(value: any[]) {
    this._records = value ? JSON.parse(JSON.stringify(value)) : [];
  }
  get records(): any[] {
    return this._records;
  }

  @Input() suggestions: string[] = [];
  @Input() totalRecords: number | null = 0;

  @Output() getSuggestions = new EventEmitter<SuggestionsQuery>();
  @Output() onDelete = new EventEmitter<DeleteRecord>();
  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onEditComplete = new EventEmitter<UpdateRecord>();
  @Output() onFilterAdded = new EventEmitter<any>();
  @Output() onFilterRemoved = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<DatatableUpdate>();
  @Output() onSort = new EventEmitter<DatatableUpdate>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] || changes['datatable']) {
      this.updateDisplayedColumns();
    }
  }

  private updateDisplayedColumns(): void {
    const visibleColumns = (this.columns || [])
      .filter(col => col.is_visible)
      .map(col => col.column_name);
    this.displayedColumns = this.datatable?.can_archive
      ? [...visibleColumns, 'actions']
      : visibleColumns;
  }

  archiveRow(row: any): void {
    if (!this.datatable) {
      return;
    }
    const recordDelete: DeleteRecord = {
      record_id: row['id'],
      table_name: this.datatable.table_name,
      schema_name: this.datatable.schema_name,
    };
    this.onDelete.emit(recordDelete);
  }

  get datatableWidth(): string {
    const columnWidths = (this.columns || []).concat(this.datatable?.can_archive ? [this.actionColumn] : [])
      .filter((c: any) => c && c.is_visible)
      .map(c => Number(String(c.styles?.width || '0').replace('px', '')));
    let totalColumnWidths = columnWidths.reduce((sum, value): number => sum + value, 0.0);
    totalColumnWidths += 2;
    totalColumnWidths = Math.max(totalColumnWidths, 400);
    totalColumnWidths = Math.min(totalColumnWidths, 1100);
    return `${totalColumnWidths}px`;
  }

  get actionColumn(): any {
    if (this.datatable?.can_archive) {
      return {
        is_visible: true,
        styles: {
          height: '38px',
          overflow: 'visible',
          'padding-top': '0px',
          'padding-bottom': '0px',
          width: '120px',
          'text-align': 'center',
        },
      };
    }
    return [];
  }

  onPageChange(event: PageEvent): void {
    if (!this.datatable) {
      return;
    }
    const payload: DatatableUpdate = {
      first: event.pageIndex * event.pageSize,
      rows: event.pageSize,
      schemaName: this.datatable.schema_name,
      tableName: this.datatable.table_name,
      sortField: this.datatable.sort_column,
      sortOrder: this.datatable.sort_order,
    };
    this.onPagination.emit(payload);
  }

  onSortChange(sort: Sort): void {
    if (!this.datatable) {
      return;
    }
    const payload: DatatableUpdate = {
      first: this.datatable.row_offset,
      rows: this.datatable.row_limit,
      schemaName: this.datatable.schema_name,
      tableName: this.datatable.table_name,
      sortField: sort.active,
      sortOrder: sort.direction === 'asc' ? 1 : -1,
    };
    this.onSort.emit(payload);
  }

  emitUpdate(column: DatatableColumn, rowData: any): void {
    if (!this.datatable || !column || !rowData) {
      return;
    }
    const update: UpdateRecord = {
      value: rowData[column.column_name],
      record_id: rowData['id'],
      column_name: column.column_name,
      table_name: this.datatable.table_name,
      schema_name: this.datatable.schema_name,
    };
    this.onEditComplete.emit(update);
  }

  onCellEditorKeydown(event: KeyboardEvent, column: DatatableColumn, rowData: any): void {
    const editEvent: EditEvent = {
      column,
      data: rowData,
      index: 0,
    };
    this.onEditCancel.emit(editEvent);
    if (event.key === 'Enter') {
      this.emitUpdate(column, rowData);
    } else if (event.key === 'Escape') {
      event.preventDefault();
    } else if (event.key === 'Tab') {
      this.emitUpdate(column, rowData);
    }
  }
}
