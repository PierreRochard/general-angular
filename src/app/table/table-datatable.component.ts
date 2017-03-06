import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'table-datatable',
  template: `<p-dataTable 
             [value]="records"
             [selection]="selectedRecords"
             [rows]="10"
             [paginator]="true"
             (selectionChange)="selectionChange.emit($event)"
             [sortMode]="multiple"
              >
                <p-header *ngIf="true">
                  <div class="ui-helper-clearfix" >
                     <button [disabled]="!!!selectedRecords"
                             type="button" 
                             class="ui-button-danger ui-button--float-left"
                             pButton 
                             icon="fa-trash" 
                             (click)="onDelete.emit($event)" 
                             label="Delete">
                     </button>
                  </div>
                </p-header>
                <p-column *ngIf="true" selectionMode="multiple"
                          [style]="{'width':'20%'}">
                </p-column>
                <p-column styleClass="col-button"
                          [style]="{'width':'30%'}">
                    <template let-record="rowData" pTemplate="body">
                        <button type="button" 
                                pButton 
                                (click)="onDelete.emit([record])" 
                                icon="fa-trash" 
                                class="ui-button-danger"
                        ></button>
                    </template>
                </p-column>
                <p-column *ngFor="let columnName of columnNames" 
                          [field]="columnName" 
                          [header]="columnName"
                          [style]="{'width':'100%'}"
                          [sortable]="true"
                ></p-column>
              </p-dataTable>`,
  styles: [`
    .ui-button--float-left {
      float: left;
    }
    
  `]
})
export class TableDatatableComponent implements OnChanges {
  public columnNames: string[];

  @Input() records:any[];
  @Input() selectedRecords:any[];
  @Input() routerPath:string;
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
