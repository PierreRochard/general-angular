import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableColumns, MultiselectOutput } from 'app/table/table.models';
import { LazyLoadEvent } from 'primeng/primeng';

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
      <div *ngFor="let column of columns">
        <p-column
                  *ngIf="column.is_visible"
                  [field]="column.value"
                  [header]="column.label"
                  [style]="{'width':'100%'}"
                  [sortable]="true"
        ></p-column>
      </div>
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
  @Input() tableName: string;
  @Input() totalRecords: number;

  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onMultiselect = new EventEmitter<MultiselectOutput>();

  _onLazyLoad(event: LazyLoadEvent) {
    this.onLazyLoad.emit(event);
  }

  _onMultiselect(event: MultiselectOutput) {
    event.tableName = this.tableName;
    this.onMultiselect.emit(event)
  }
}
