import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns } from 'app/table/table.models';

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
      (onLazyLoad)="_onLazyLoad($event)"
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

  @Output() onLazyLoad = new EventEmitter<any>();

  _onLazyLoad(event) {
    this.onLazyLoad.emit(event);
  }

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

}
