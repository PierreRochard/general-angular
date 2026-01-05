import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableState } from './table.reducers';

export const selectTableState = createFeatureSelector<TableState>('table');

export const selectAreColumnsLoading = createSelector(
  selectTableState,
  state => state.areColumnsLoading,
);

export const selectAreRecordsLoading = createSelector(
  selectTableState,
  state => state.areRecordsLoading,
);

export const selectColumns = createSelector(
  selectTableState,
  state => state.columns,
);

export const selectDatatable = createSelector(
  selectTableState,
  state => state.datatable,
);

export const selectIsDatatableLoading = createSelector(
  selectTableState,
  state => state.isDatatableLoading,
);

export const selectRecords = createSelector(
  selectTableState,
  state => state.records,
);

export const selectSuggestions = createSelector(
  selectTableState,
  state => state.suggestions,
);

export const selectRowCount = createSelector(
  selectTableState,
  state => state.rowCount,
);
