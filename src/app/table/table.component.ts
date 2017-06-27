import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns } from 'app/table/table.models';

@Component({
  selector: 'app-table-component',
  template: `
    <p-dataTable
      *ngIf="columns.length > 0"
      [dataKey]="dataKey"
      [paginator]="paginator"
      [lazy]="true"
      [loading]="areRecordsLoading"
      (onLazyLoad)="_onLazyLoad($event)"
      [reorderableColumns]="reorderableColumns"
      [rows]="rowLimit"
      [sortMode]="sortMode"
      [totalRecords]="totalRecords"
      [value]="records"
    >
      <p-header>
        <div class="ui-helper-clearfix" style="width:100%;">
          <div
            style="float:right;">
          <app-columns-multiselect-component
            [columns]="columns"
            [selectedColumns]="columns"
            (onChange)="_onMultiselect($event)"
          >
          </app-columns-multiselect-component>
          </div>
        </div>
      </p-header>
      <p-column *ngFor="let column of columns"
                [field]="column.value"
                [header]="column.label"
                [style]="{'width':'100%'}"
                [sortable]="true"
      ></p-column>
    </p-dataTable>`
})
export class TableComponent {
  public dataKey = 'id';
  public paginator = true;
  public reorderableColumns = false;
  public resizableColumns = true;
  public selectedRecords: any[] = [];
  public selectionMode = 'multiple';
  public sortMode = 'multiple';

  @Input() areRecordsLoading: boolean;
  @Input() columns: DatatableColumns[];
  @Input() records: any[];
  @Input() rowLimit: number;
  @Input() totalRecords: number;

  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onMultiselect = new EventEmitter<any>();

  _onLazyLoad(event) {
    this.onLazyLoad.emit(event);
  }

  _onMultiselect(event) {
    this.onMultiselect.emit(event)
  }
}
