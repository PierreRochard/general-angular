import {Component, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable
             [dataKey]="dataKey"
             [paginator]="paginator"
             (onColReorder)="onColReorder($event)"
             [reorderableColumns]="reorderableColumns"
             [rows]="rows"
             (selectionChange)="selectionChange($event)"
             [sortMode]="sortMode"
             [value]="records"
              >
              <p-column [style]="{'width':'38px'}" [selectionMode]="selectionMode"></p-column>
                <p-column *ngFor="let columnName of columnNames" 
                          [field]="columnName" 
                          [header]="columnName"
                          [style]="{'width':'100%'}"
                          [sortable]="true"
                ></p-column>
              </p-dataTable>`
})
export class TableDatatableComponent implements OnChanges {
  public columnNames: string[];
  public dataKey: string = 'id';
  public paginator: boolean = true;
  public reorderableColumns: boolean = true;
  public resizableColumns: boolean = true;
  public rows: number = 10;
  public selectedRecords: any[] = [];
  public selectionMode: string = 'multiple';
  public sortMode: string = 'multiple';

  @Input() records:any[];

  ngOnChanges() {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }

  selectionChange(event) {
    this.selectedRecords = event;
  }

  onColReorder(event) {
    console.log(event);
    let old_index = event.dragIndex - 1;
    let new_index = event.dropIndex - 1;
    console.log(old_index);
    console.log(new_index);
  }

  onColumnResize(event) {
    console.log(event);
  }

}
