import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable [value]="records"
             [rows]="10"
             [paginator]="true"
             (selectionChange)="selectionChange($event)" 
              >
                <p-column selectionMode="multiple"
                          [style]="{'width':'20%'}">
                </p-column>
                <p-column *ngFor="let columnName of columnNames" 
                field="{{columnName}}" 
                header="{{columnName}}"
                [style]="{'width':'100%'}"
                ></p-column>
                <p-header>
                  <div class="ui-helper-clearfix" >
                     <button [disabled]="selectedRecords.length === 0"
                             type="button" 
                             class="ui-button-danger ui-button--float-left"
                             pButton 
                             icon="fa-trash" 
                             (click)="onDelete.emit(selectedRecords)" 
                             label="Delete">
                     </button>
                  </div>
                </p-header>
              </p-dataTable>`,
  styles: [`
    .ui-button--float-left {
      float: left;
    }
    
  `]
})
export class TableDatatableComponent implements OnChanges {
  public columnNames: string[];
  public selectedRecords:any[] = [];

  @Input() records:any[];
  @Input() selectedPathName:string;
  @Output() onDelete = new EventEmitter<any>();

  ngOnChanges() {
    this.columnNames = (this.records === null || this.records.length === 0) ?
      [] :
      Object.keys(this.records[0]);
  }

  onColResize(event) {
    console.log(event);
  }

  selectionChange(event) {
    this.selectedRecords = event;
    console.log(event);
  }
}
