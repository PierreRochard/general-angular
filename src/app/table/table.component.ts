import { Component, EventEmitter, Input, Output } from '@angular/core';

import {SelectItem} from 'primeng/components/common/selectitem';

import {
  DatatableColumn,
  DatatableUpdate,
  MultiselectOutput
} from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  template: `
    <p-dataTable
      [dataKey]="dataKey"
      [editable]="true"
      [globalFilter]="gb"
      [paginator]="paginator"
      [lazy]="true"
      [loading]="areRecordsLoading"
      (onEditComplete)="_onEditComplete($event.column.field, $event.data[$event.column.field], $event.data.id)"
      (onEditCancel)="_onEditCancel($event)"
      (onLazyLoad)="_onLazyLoad($event)"
      [reorderableColumns]="reorderableColumns"
      [resizableColumns]="true"
      [responsive]="true"
      [rows]="rowLimit"
      [rowHover]="true"
      [rowsPerPageOptions]="rowsPerPage"
      [sortField]="sortColumn"
      [sortOrder]="sortOrder"
      [totalRecords]="totalRecords"
      [value]="records"
    >
      <p-header>
        <div class="ui-helper-clearfix" style="width:100%;">
          <input #gb type="text" placeholder="Global search" style="float:left;">
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
      <p-column
        *ngFor="let column of columns"
        [editable]="column.editable"
        [field]="column.value"
        [header]="column.label"
        [hidden]="!column.is_visible"
        [style]="{'width':'100%', 'overflow':'visible'}"
        [sortable]="column.is_sortable"
        [filter]="column.is_filterable"
        [filterMatchMode]="column.filter_match_mode"
      >
        <ng-template let-row="rowData" pTemplate="body">
          <div [ngSwitch]="column.data_type">
          <span *ngSwitchCase="'timestamp without time zone'">
            {{row[column.value] | date:column.format_pattern}}
          </span>
            <span *ngSwitchCase="'numeric'">
            {{row[column.value] | number:column.format_pattern}}
          </span>
            <span *ngSwitchDefault>
            {{row[column.value]}}
          </span>
          </div>
        </ng-template>
        
        <ng-template let-col let-row="rowData" pTemplate="editor"
                     *ngIf="column.input_type !== 'text'">
          <p-dropdown *ngIf="column.input_type === 'dropdown'"
                      [autoWidth]="false"
                      [editable]="true"
                      [filter]="true"
                      [options]="options"
                      [placeholder]="row[column.value]"
                      [required]="true"
                      [style]="{'width':'100%'}"
                      (onChange)="_onEditComplete(column.value, $event.value)"
          >
          </p-dropdown>
          
        </ng-template>
        
      </p-column>
    </p-dataTable>`
})
export class TableComponent {
  public options: SelectItem[] = [{label: '1', value: '1'}, {label: '2', value: '1'}];
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
  @Input() set records(value: any[]) {
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

  _onEditCancel(event) {
    event.tableName = this.tableName;
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
    //   .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.tableName, filter_value: event.filters[c].value}));
    // const removedFilters = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) === -1)
    //   .map(c => this.onFilterRemoved.emit({column_name: c, table_name: this.tableName}));
    // const newFilterValues = oldFilteredColumns.filter(c => newFilteredColumns.indexOf(c) > -1)
    //   .filter(c => event.filters[c].value !== this.columns.find(col => col.value === c).filter_value)
    //   .map(c => this.onFilterAdded.emit({column_name: c, table_name: this.tableName, filter_value: event.filters[c].value}));
  }

  _onMultiselect(event: MultiselectOutput) {
    event.tableName = this.tableName;
    this.onMultiselect.emit(event)
  }
}
