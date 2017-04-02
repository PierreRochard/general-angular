import {Component, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable
             [value]="records"
             [rows]="10"
             [paginator]="true"
              >
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

  @Input() records:any[];

  ngOnChanges(changes: SimpleChanges) {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }
}
