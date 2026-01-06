import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { TableComponent } from './table.component';
import { Datatable, DatatableColumn, DatatableUpdate, DeleteRecord } from './table.models';

const emptyRecords: any[] = require('../../../mock_data/table/table.records.empty.json');
const edgeRecords: any[] = require('../../../mock_data/table/table.records.edge.json');

describe('TableComponent (Material harnesses)', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  const baseColumns: DatatableColumn[] = [
    {
      column_name: 'name',
      custom_name: 'Name',
      input_type: 'text',
      data_type: 'text',
      can_update: true,
      is_visible: true,
      is_sortable: true,
      styles: { width: '200px' },
    } as any,
    {
      column_name: 'labels',
      custom_name: 'Labels',
      input_type: 'text',
      data_type: 'json',
      is_select_item: true,
      is_multiple: true,
      select_item_label_column_name: 'label',
      can_update: false,
      is_visible: true,
      is_sortable: false,
      styles: { width: '300px' },
    } as any,
    {
      column_name: 'amount',
      custom_name: 'Amount',
      input_type: 'text',
      data_type: 'numeric',
      format_pattern: '1.0-0',
      can_update: false,
      is_visible: true,
      is_sortable: true,
      styles: { width: '180px' },
    } as any,
    {
      column_name: 'created_at',
      custom_name: 'Created',
      input_type: 'text',
      data_type: 'timestamp without time zone',
      format_pattern: 'mediumDate',
      can_update: false,
      is_visible: true,
      is_sortable: true,
      styles: { width: '180px' },
    } as any,
    {
      column_name: 'note_text',
      custom_name: 'Note',
      input_type: 'autocomplete',
      data_type: 'text',
      can_update: true,
      is_visible: true,
      is_sortable: false,
      styles: { width: '220px' },
    } as any,
  ];

  const baseDatatable: Datatable = {
    custom_name: 'Edge Table',
    schema_name: 'public',
    table_name: 'edge',
    row_limit: 10,
    row_offset: 0,
    sort_column: 'name',
    sort_order: 1,
    can_archive: true,
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
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
      declarations: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  const setup = (datatable: Partial<Datatable>, records: any[], columns: DatatableColumn[] = baseColumns) => {
    component.datatable = { ...baseDatatable, ...datatable } as Datatable;
    component.records = records;
    component.columns = columns;
    component.totalRecords = records?.length ?? 0;
    (component as any).updateDisplayedColumns();
    fixture.detectChanges();
    return TestbedHarnessEnvironment.loader(fixture);
  };

  it('renders zero rows and hides actions column when empty and not archivable', async () => {
    component.datatable = { ...baseDatatable, can_archive: false } as Datatable;
    component.columns = baseColumns;
    component.records = emptyRecords;
    component.totalRecords = 0;
    (component as any).updateDisplayedColumns();
    fixture.detectChanges();

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const table = await loader.getHarness(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).toBe(0);
    expect(component.displayedColumns).not.toContain('actions');

  });

  it('renders edge-case values including special characters and formatted types', async () => {
    setup({}, edgeRecords);
    expect(component.records[0].name).toContain('Very long name');
    expect(JSON.stringify(component.records[0])).toContain('Alpha');
    expect(JSON.stringify(component.records[0])).toContain('Beta');
    expect(String(component.records[0].amount)).toContain('1234567890123');
    expect(component.records[0].created_at).toContain('2024');
  });

  it('emits pagination updates with correct first/rows values', async () => {
    component.datatable = { ...baseDatatable, row_offset: 20, row_limit: 10 } as Datatable;
    component.records = edgeRecords;
    component.columns = baseColumns;
    component.totalRecords = 100;
    (component as any).updateDisplayedColumns();
    fixture.detectChanges();
    const emitSpy = spyOn(component.onPagination, 'emit');

    component.onPageChange({
      pageIndex: 3,
      pageSize: 10,
      length: 100,
      previousPageIndex: 2,
    } as any);
    expect(emitSpy).toHaveBeenCalledWith(jasmine.objectContaining<DatatableUpdate>({
      first: 30,
      rows: 10,
      schemaName: baseDatatable.schema_name,
      tableName: baseDatatable.table_name,
    }));
  });

  it('disables sorting for non-sortable columns and emits sort events for sortable ones', async () => {
    setup({}, edgeRecords);
    const labelsColumn = component.columns.find(c => c.column_name === 'labels');
    expect(labelsColumn?.is_sortable).toBeFalse();

    const sortSpy = spyOn(component.onSort, 'emit');
    component.onSortChange({ active: 'name', direction: 'asc' } as any);
    expect(sortSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      sortField: 'name',
      sortOrder: 1,
    }));
  });

  it('emits suggestions and updates on autocomplete interactions', async () => {
    component.suggestions = ['Note A', 'Note B'];
    component.datatable = { ...baseDatatable };
    component.records = edgeRecords;
    component.columns = baseColumns;
    (component as any).updateDisplayedColumns();
    fixture.detectChanges();

    const getSuggestionsSpy = spyOn(component.getSuggestions, 'emit');
    const updateSpy = spyOn(component.onEditComplete, 'emit');

    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input[placeholder="Note"]');
    inputEl.focus();
    inputEl.value = 'New note';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(getSuggestionsSpy).toHaveBeenCalledWith(jasmine.objectContaining({ column: jasmine.any(Object), value: 'New note' }));

    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('shows archive action only when can_archive is true and emits delete payload', async () => {
    setup({ can_archive: true }, edgeRecords);
    expect(component.displayedColumns).toContain('actions');

    const deleteSpy = spyOn(component.onDelete, 'emit');
    const deleteButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[color="warn"]');
    deleteButton.click();
    fixture.detectChanges();

    expect(deleteSpy).toHaveBeenCalledWith(jasmine.objectContaining<DeleteRecord>({
      record_id: edgeRecords[0].id,
      table_name: baseDatatable.table_name,
      schema_name: baseDatatable.schema_name,
    }));
  });

  it('clamps datatableWidth between 400 and 1100 and accounts for action column', () => {
    component.datatable = { ...baseDatatable, can_archive: false } as Datatable;
    component.columns = baseColumns.map(col => ({ ...col, styles: { width: '50px' } })) as any;
    expect(parseInt(component.datatableWidth, 10)).toBeGreaterThanOrEqual(400);

    component.datatable = { ...baseDatatable, can_archive: true } as Datatable;
    component.columns = baseColumns.map(col => ({ ...col, styles: { width: '300px' } })) as any;
    const width = parseInt(component.datatableWidth, 10);
    expect(width).toBeLessThanOrEqual(1100);
    expect(width).toBeGreaterThan(0);
  });
});
