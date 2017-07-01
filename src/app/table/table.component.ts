import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DatatableColumns, DatatableUpdate,
  MultiselectOutput
} from 'app/table/table.models';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-table-component',
  template: `
    <p-dataTable
      *ngIf="columns.length > 0"
      [dataKey]="dataKey"
      [globalFilter]="gb"
      [paginator]="paginator"
      [lazy]="true"
      [loading]="areRecordsLoading"
      (onLazyLoad)="_onLazyLoad($event)"
      [reorderableColumns]="reorderableColumns"
      [rows]="rowLimit"
      [sortField]="sortColumn"
      [sortOrder]="sortOrder"
      [totalRecords]="totalRecords"
      [value]="records"
    >
      <p-header>
        <div class="ui-helper-clearfix" style="width:100%;">
            <input #gb type="text" placeholder="Global search"  style="float:left;">
          <div style="float:right;">
            <app-columns-multiselect-component
              [columns]="columns"
              [selectedColumns]="columns"
              (onChange)="_onMultiselect($event)"
            >
          </app-columns-multiselect-component>
          </div>
        </div>
      </p-header>
      <div *ngFor="let column of columns">
        <p-column
                  *ngIf="column.is_visible"
                  [field]="column.value"
                  [header]="column.label"
                  [style]="{'width':'100%'}"
                  [sortable]="column.is_sortable"
                  [filter]="column.is_filterable"
                  [filterMatchMode]="column.filter_match_mode"
        ></p-column>
      </div>
    </p-dataTable>`
})
export class TableComponent {
  public dataKey = 'id';
  public filterMatchMode = 'contains';
  public paginator = true;
  public reorderableColumns = false;
  public resizableColumns = true;
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';

  @Input() areRecordsLoading: boolean;
  @Input() columns: DatatableColumns[];
  @Input() records: any[];
  @Input() rowLimit: number;
  @Input() rowOffset: number;
  @Input() sortColumn: string;
  @Input() sortOrder: number;
  @Input() tableName: string;
  @Input() totalRecords: number;

  @Output() onFilterAdded = new EventEmitter<any>();
  @Output() onFilterRemoved = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<DatatableUpdate>();
  @Output() onSort = new EventEmitter<DatatableUpdate>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  _onLazyLoad(event: DatatableUpdate) {
    console.log(event);
    event.tableName = this.tableName;
    if (event.first !== this.rowOffset) {
      this.onPagination.emit(event);
    }
    if (event.sortOrder !== this.sortOrder || event.sortField !== this.sortColumn) {
      this.onSort.emit(event);
    }
    const newFilteredColumns = Object.keys(event.filters);
    const oldFilteredColumns = this.columns.filter(c => c.filter_value !== null && c.filter_value.length > 0).map(c => {
      return c.value
    });
    const addedFilters = newFilteredColumns.filter(c => oldFilteredColumns.indexOf(c) === -1)
      .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.tableName, filter_value: event.filters[c].value}));
    const removedFilters = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) === -1)
      .map(c => this.onFilterRemoved.emit({column_name: c, table_name: this.tableName}));
    const newFilterValues = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) > -1)
      .filter(c => event.filters[c].value !== this.columns.find(col => col.value === c).filter_value)
      .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.tableName, filter_value: event.filters[c].value}));
  }

  _onMultiselect(event: MultiselectOutput) {
    event.tableName = this.tableName;
    this.onMultiselect.emit(event)
  }
}
