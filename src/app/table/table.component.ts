import {Component, Input} from '@angular/core';
import { DatatableColumns } from 'app/table/table.models';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-table-component',
  template: `
    <p-dataTable
      *ngIf="columns.length > 0"
      [dataKey]="dataKey"
      [paginator]="paginator"
      [lazy]="true"
      [loading]="areRecordsLoading"
      (onColReorder)="onColReorder($event)"
      (onLazyLoad)="loadData($event)"
      [reorderableColumns]="reorderableColumns"
      [rows]="rowLimit"
      (selectionChange)="selectionChange($event)"
      [sortMode]="sortMode"
      [totalRecords]="totalRecords"
      [value]="records"
    >
      <p-column [style]="{'width':'38px'}" [selectionMode]="selectionMode"></p-column>
      <p-column *ngFor="let column of columns"
                [field]="column.field"
                [header]="column.header"
                [style]="{'width':'100%'}"
                [sortable]="true"
      ></p-column>
    </p-dataTable>`
})
export class TableComponent {
  public dataKey = 'id';
  public paginator = true;
  public reorderableColumns = true;
  public resizableColumns = true;
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';
  public sortMode = 'multiple';

  @Input() areRecordsLoading: boolean;
  @Input() columns: DatatableColumns[];
  @Input() records: any[];
  @Input() rowLimit: number;
  @Input() totalRecords: number;

  onColReorder(event) {
    const old_index = event.dragIndex - 1;
    const new_index = event.dropIndex - 1;
    console.log(event);
    console.log(old_index);
    console.log(new_index);
  }

  onColumnResize(event) {
    console.log(event);
  }

  selectionChange(event) {
    this.selectedRecords = event;
  }

  loadData(event: LazyLoadEvent) {
    console.log(event);
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort in single sort mode
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    // filters: Filters object having field as key and filter value, filter matchMode as value
    // globalFilter: Value of the global filter if available
    //  this.cars = // do a request to a remote datasource using a service and return the cars that match the lazy load criteria
  }

}
