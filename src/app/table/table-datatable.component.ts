import {Component, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable
             [dataKey]="dataKey"
             [paginator]="paginator"
             [value]="records"
             [rows]="rows"
             [sortMode]="sortMode"
             (selectionChange)="selectionChange($event)" 
              >
              <p-column [style]="{'width':'38px'}" selectionMode="multiple"></p-column>
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
  public rows: number = 10;
  public selectedRecords: any[] = [];
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

}
