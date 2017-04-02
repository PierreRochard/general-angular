import {Component, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable
             [value]="records"
             [rows]="10"
             [paginator]="true"
             sortMode="multiple"
             (onRowSelect)="onRowSelect($event)" 
             (onRowUnselect)="onRowUnselect($event)"
              >
              <p-column [style]="{'width':'38px'}" selectionMode="multiple"></p-column>
                <p-column *ngFor="let columnName of columnNames" 
                          [field]="columnName" 
                          [header]="columnName"
                          [style]="{'width':'100%'}"
                          [sortable]="true"
                ></p-column>
              </p-dataTable>
{{selectedRecords | json}}`
})
export class TableDatatableComponent implements OnChanges {
  public columnNames: string[];
  public selectedRecords: any[];

  @Input() records:any[];

  ngOnChanges() {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }

  onRowSelect(event) {
    this.selectedRecords = event.data;
  }

  onRowUnselect(event) {
    this.selectedRecords = event.data;
  }
}
