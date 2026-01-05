import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';

import { TableState, tableReducer } from './table.reducers';
import {
  receiveDatatable,
  receiveDatatableColumns,
  receiveRecords,
  updateKeyword,
  updateRowCount,
  updateTableName,
} from './table.actions';
import {
  selectColumns,
  selectDatatable,
  selectRecords,
  selectRowCount,
} from './table.selectors';

describe('Table store integration', () => {
  let store: Store<{ table: TableState }>;

  const datatable = {
    table_name: 'accounts',
    schema_name: 'chart_of_accounts',
    row_limit: 10,
    row_offset: 0,
    sort_column: 'name',
    sort_order: 1,
    can_archive: true,
    filter_columns: [],
  } as any;

  const columns = [
    {
      column_name: 'name',
      custom_name: 'Name',
      is_visible: true,
      is_sortable: true,
      can_update: true,
      data_type: 'text',
      input_type: 'text',
      styles: { width: '200px' },
    },
  ] as any[];

  const records = [{ id: 1, name: 'Cash' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ table: tableReducer })],
    });
    store = TestBed.inject(Store);
  });

  it('maps datatable, columns, and records through selectors after dispatch', async () => {
    store.dispatch(receiveDatatable({ datatable }));
    store.dispatch(receiveDatatableColumns({ columns }));
    store.dispatch(receiveRecords({ records }));
    store.dispatch(updateRowCount({ rowCount: 50 }));
    store.dispatch(updateTableName({
      params: { selectedObjectName: 'accounts', selectedSchemaName: 'chart_of_accounts', selectedObjectType: 'table' } as any,
    }));
    store.dispatch(updateKeyword({ column: { column_name: 'name', filter_value: 'Cash' } as any, value: 'Cash' }));

    const selectedDatatable = await firstValueFrom(store.select(selectDatatable).pipe(take(1)));
    const selectedColumns = await firstValueFrom(store.select(selectColumns).pipe(take(1)));
    const selectedRecords = await firstValueFrom(store.select(selectRecords).pipe(take(1)));
    const rowCount = await firstValueFrom(store.select(selectRowCount).pipe(take(1)));

    expect(selectedDatatable?.table_name).toBe('accounts');
    expect(selectedDatatable?.filter_columns?.[0].column_name).toBe('name');
    expect(selectedColumns).toEqual(columns);
    expect(selectedRecords).toEqual(records);
    expect(rowCount).toBe(50);
  });
});
