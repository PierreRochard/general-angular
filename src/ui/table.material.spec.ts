import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from '../app/table/table.component';
import { Datatable, DatatableColumn, DatatableUpdate } from '../app/table/table.models';

describe('TableComponent (Material)', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  const datatable: Datatable = {
    can_archive: true,
    can_delete: true,
    custom_name: 'Accounts',
    order_index: 0,
    row_limit: 10,
    row_offset: 0,
    schema_name: 'chart_of_accounts',
    sort_column: 'name',
    sort_order: 1,
    table_name: 'accounts',
    user_id: 'user-1',
    filter_columns: [],
  };

  const columns: DatatableColumn[] = [
    {
      can_update: true,
      column_name: 'name',
      custom_name: 'Name',
      data_type: 'text',
      filter_match_mode: 'contains',
      filter_value: '',
      format_pattern: '',
      input_type: 'text',
      is_filterable: true,
      is_multiple: false,
      is_select_item: false,
      is_sortable: true,
      is_visible: true,
      schema_name: 'chart_of_accounts',
      select_item_label_column_name: '',
      select_item_schema_name: '',
      select_item_table_name: '',
      select_item_value_column_name: '',
      styles: {
        height: 'auto',
        overflow: 'visible',
        'padding-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        width: '200px',
      },
      suggestion_column_name: '',
      suggestion_schema_name: '',
      suggestion_table_name: '',
      table_name: 'accounts',
      user_id: 'user-1',
    },
  ];

  const records = [{ id: 1, name: 'Cash' }];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = columns;
    component.datatable = datatable;
    component.records = records;
    component.totalRecords = records.length;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders a material table with data', () => {
    const title = fixture.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toContain(datatable.custom_name);
    const table = fixture.nativeElement.querySelector('table[mat-table]');
    expect(table).toBeTruthy();
  });

  it('emits sort changes', () => {
    const spy = spyOn(component.onSort, 'emit');
    const sort: Sort = { active: 'name', direction: 'desc' };
    component.onSortChange(sort);
    expect(spy).toHaveBeenCalledWith(
      jasmine.objectContaining<Partial<DatatableUpdate>>({
        sortField: 'name',
        sortOrder: -1,
      }),
    );
  });

  it('emits pagination changes', () => {
    const spy = spyOn(component.onPagination, 'emit');
    component.onPageChange({ pageIndex: 1, pageSize: 10, length: 20 } as any);
    expect(spy).toHaveBeenCalledWith(
      jasmine.objectContaining<Partial<DatatableUpdate>>({
        first: 10,
        rows: 10,
      }),
    );
  });

  it('emits archive action', () => {
    const spy = spyOn(component.onDelete, 'emit');
    component.archiveRow(records[0]);
    expect(spy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        record_id: 1,
        table_name: datatable.table_name,
      }),
    );
  });
});
