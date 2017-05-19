import {Component, Input, OnChanges} from '@angular/core';

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
  public dataKey = 'id';
  public paginator = true;
  public reorderableColumns = true;
  public resizableColumns = true;
  public rows = 10;
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';
  public sortMode = 'multiple';

  @Input() records: any[];

  static onColReorder(event) {
    const old_index = event.dragIndex - 1;
    const new_index = event.dropIndex - 1;
    console.log(event);
    console.log(old_index);
    console.log(new_index);
  }

  static onColumnResize(event) {
    console.log(event);
  }

  ngOnChanges() {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }

  selectionChange(event) {
    this.selectedRecords = event;
  }

}
