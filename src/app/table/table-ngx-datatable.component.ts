import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'table-ngx-datatable',
  template: `{{selectedRecords | json}}
             <ngx-datatable #dataTable
             [rows]="records"
             [columns]="columnNames"
              >
              </ngx-datatable>`
})
export class TableNgxDatatableComponent implements OnChanges {
  public columnNames: string[];

  @Input() records:any[];
  @Input() selectedRecords:any[];
  @Output() onDelete = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();

  ngOnChanges() {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }

  onColResize(event) {
    console.log(event);
  }
}
