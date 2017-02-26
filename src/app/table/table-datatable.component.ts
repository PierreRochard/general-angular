import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `
<p-dataTable [value]="data"
              [resizableColumns]="true"
              (onColResize)="onColResize($event)"
              >
    <p-column *ngFor="let columnName of columnNames" 
              field="{{columnName}}" 
              header="{{columnName}}"
              ></p-column>
</p-dataTable>
`
})
export class TableDatatableComponent implements OnChanges {
  columnNames: string[];
  @Input() data:any[];

  ngOnChanges() {
    if (this.data) {
      this.columnNames = Object.keys(this.data[0]);
    } else {
      this.columnNames = [];
    }
  }

  onColResize(event) {
    console.log(event);
  }
}
