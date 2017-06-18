import {Component, Input, OnChanges} from '@angular/core';
import { ColumnSetting } from 'app/table/table.models';

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
                <p-column *ngFor="let columnSetting of columnSettings" 
                          [field]="columnSetting.field" 
                          [header]="columnSetting.header"
                          [style]="{'width':'100%'}"
                          [sortable]="true"
                ></p-column>
              </p-dataTable>`
})
export class TableComponent {
  public dataKey = 'id';
  public paginator = true;
  public reorderableColumns = true;
  public resizableColumns = true;
  public rows = 10;
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';
  public sortMode = 'multiple';

  @Input() columnSettings: ColumnSetting[];
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

  selectionChange(event) {
    this.selectedRecords = event;
  }

}
