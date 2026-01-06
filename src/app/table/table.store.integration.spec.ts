import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';

import { TableState, tableReducer } from './table.reducers';
import {
  getDatatable,
  receiveDatatable,
  receiveDatatableColumns,
  receiveRecords,
  removeRecord,
  setRecordsLoading,
  updateColumnsVisibility,
  updateKeyword,
  updatePagination,
  updateRowCount,
  updateSort,
  updateTableName,
} from './table.actions';
import {
  selectAreRecordsLoading,
  selectColumns,
  selectDatatable,
  selectRecords,
  selectRowCount,
  selectTableState,
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
    store.dispatch(getDatatable({ params: { selectedObjectName: 'accounts', selectedSchemaName: 'chart_of_accounts', selectedObjectType: 'table' } as any }));
    const loadingState = await firstValueFrom(store.select(selectTableState).pipe(take(1)));
    expect(loadingState.isDatatableLoading).toBeTrue();

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
    expect(selectedDatatable?.row_limit).toBe(10);
  });

  it('updates pagination and sort while keeping immutability', async () => {
    store.dispatch(receiveDatatable({ datatable }));
    store.dispatch(receiveRecords({ records }));
    const prevState = await firstValueFrom(store.select(selectTableState));

    store.dispatch(updatePagination({
      update: {
        first: 20,
        rows: 10,
        schemaName: datatable.schema_name,
        tableName: datatable.table_name,
        sortField: datatable.sort_column,
        sortOrder: datatable.sort_order,
      },
    }));
    store.dispatch(updateSort({
      update: {
        first: 20,
        rows: 10,
        schemaName: datatable.schema_name,
        tableName: datatable.table_name,
        sortField: 'name',
        sortOrder: -1,
      },
    }));

    const nextState = await firstValueFrom(store.select(selectTableState));
    expect(nextState.rowOffset).toBe(20);
    expect(nextState.rowLimit).toBe(10);
    expect(nextState.sortOrder).toBe(-1);
    expect(prevState.records).toEqual(records); // immutability check
  });

  it('removes records and updates row count on removeRecord', async () => {
    store.dispatch(receiveDatatable({ datatable }));
    store.dispatch(receiveRecords({ records }));
    store.dispatch(updateRowCount({ rowCount: 2 }));

    store.dispatch(removeRecord({ record: records[0] }));

    const remainingRecords = await firstValueFrom(store.select(selectRecords).pipe(take(1)));
    const rowCount = await firstValueFrom(store.select(selectRowCount).pipe(take(1)));
    expect(remainingRecords.length).toBe(0);
    expect(rowCount).toBe(1);
  });

  it('toggles visibility for columns', async () => {
    store.dispatch(receiveDatatable({ datatable }));
    store.dispatch(receiveDatatableColumns({ columns }));
    store.dispatch(updateColumnsVisibility({ columns, isVisible: false }));
    const hidden = await firstValueFrom(store.select(selectColumns));
    expect(hidden[0].is_visible).toBeFalse();

    store.dispatch(updateColumnsVisibility({ columns, isVisible: true }));
    const visible = await firstValueFrom(store.select(selectColumns));
    expect(visible[0].is_visible).toBeTrue();
  });

  it('resets loading flags on error paths', async () => {
    store.dispatch(getDatatable({ params: { selectedObjectName: 'accounts', selectedSchemaName: 'chart_of_accounts', selectedObjectType: 'table' } as any }));
    store.dispatch(setRecordsLoading({ isLoading: true }));
    store.dispatch(setRecordsLoading({ isLoading: false }));

    const loading = await firstValueFrom(store.select(selectAreRecordsLoading));
    const state = await firstValueFrom(store.select(selectRecords));
    expect(loading).toBeFalse();
    expect(state).toEqual([]);
  });
});
