import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable [value]="data"
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
                     <button [disabled]="selectedData.length === 0"
                             type="button" 
                             class="ui-button-danger ui-button--float-left"
                             pButton 
                             icon="fa-trash" 
                             (click)="deleteRecords()" 
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
  columnNames: string[];
  @Input() data:any[];
  @Input() selectedPathName:string;
  selectedData:any[] = [];

  ngOnChanges() {
    this.columnNames = (this.data === null || this.data.length === 0) ?
      [] :
      Object.keys(this.data[0]);
  }

  onColResize(event) {
    console.log(event);
  }

  selectionChange(event) {
    this.selectedData = event;
    console.log(event);
  }


}
