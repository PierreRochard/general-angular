import {
  selectAreColumnsLoading,
  selectAreRecordsLoading,
  selectColumns,
  selectDatatable,
  selectIsDatatableLoading,
  selectRecords,
  selectRowCount,
  selectSuggestions,
  selectTableState,
} from './table.selectors';
import { TableState } from './table.reducers';

describe('Table selectors', () => {
  const tableState: TableState = {
    areColumnsLoading: true,
    areRecordsLoading: false,
    columns: [{ column_name: 'name', custom_name: 'Name' } as any],
    datatable: { table_name: 'accounts', schema_name: 'chart_of_accounts', row_limit: 10, row_offset: 0, sort_column: 'name', sort_order: 1 } as any,
    isDatatableLoading: false,
    records: [{ id: 1, name: 'Cash' }],
    rowCount: 42,
    rowLimit: 10,
    rowOffset: 0,
    schemaName: 'chart_of_accounts',
    selectedRecords: [],
    suggestions: ['Cash', 'Receivables'],
    suggestionsColumn: null,
    sortColumn: 'name',
    sortOrder: 1,
    tableName: 'accounts',
  };

  it('selects feature slice', () => {
    expect(selectTableState.projector(tableState)).toEqual(tableState);
  });

  it('selects flags and data', () => {
    expect(selectAreColumnsLoading.projector(tableState)).toBeTrue();
    expect(selectAreRecordsLoading.projector(tableState)).toBeFalse();
    expect(selectIsDatatableLoading.projector(tableState)).toBeFalse();
    expect(selectColumns.projector(tableState)).toEqual(tableState.columns);
    expect(selectDatatable.projector(tableState)).toEqual(tableState.datatable);
    expect(selectRecords.projector(tableState)).toEqual(tableState.records);
    expect(selectRowCount.projector(tableState)).toBe(42);
    expect(selectSuggestions.projector(tableState)).toEqual(tableState.suggestions);
  });
});
