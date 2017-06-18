import {Component, Input} from '@angular/core';
import { TableColumnSetting } from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  template: `<p-dataTable
             [dataKey]="dataKey"
             [paginator]="paginator"
             (onColReorder)="onColReorder($event)"
             [reorderableColumns]="reorderableColumns"
             [rows]="rows"
             (selectionChange)="selectionChange($event)"
             [sortMode]="sortMode"
             [value]="tableRecords"
              >
              <p-column [style]="{'width':'38px'}" [selectionMode]="selectionMode"></p-column>
                <p-column *ngFor="let tableColumnSetting of tableColumnSettings"
                          [field]="tableColumnSetting.field"
                          [header]="tableColumnSetting.header"
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

  @Input() tableColumnSettings: TableColumnSetting[];
  @Input() tableRecords: any[];

  onColReorder(event) {
    const old_index = event.dragIndex - 1;
    const new_index = event.dropIndex - 1;
    console.log(event);
    console.log(old_index);
    console.log(new_index);
  }

  onColumnResize(event) {
    console.log(event);
  }

  selectionChange(event) {
    this.selectedRecords = event;
  }

}
