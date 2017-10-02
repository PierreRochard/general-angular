import { Column, LazyLoadEvent } from 'primeng/primeng';

export interface Datatable {
  can_delete: boolean;
  custom_name: string;
  order_index: number;
  row_limit: number;
  row_offset: number;
  schema_name: string;
  sort_column: string;
  sort_order: number;
  table_name: string;
  user_id: string;
}

export interface DatatableColumn {
  can_update: boolean;
  column_name: string;
  custom_name: string;
  data_type: string;
  filter_match_mode: string;
  filter_value: string;
  format_pattern: string;
  input_type: string;
  is_filterable: boolean;
  is_sortable: boolean;
  is_visible: boolean;
  schema_name: string;
  select_item_schema_name: string;
  select_item_table_name: string;
  select_item_label_column_name: string;
  select_item_value_column_name: string;
  table_name: string;
  user_id: string;
}

export interface MultiselectOutput {
  added: DatatableColumn[];
  removed: DatatableColumn[];
  schemaName?: string;
  tableName?: string;
}

export interface ColumnsVisibilityUpdate {
  columns: string[];
  isVisible: boolean;
  schemaName: string;
  tableName: string;
}

export interface ColumnResizeEvent {
  element: HTMLElement;
  delta: number;
}

export interface EditEvent {
  column: Column;
  data: any;
  index: number;
}

export interface RecordsUpdate {
  value: any;
  record_id: any;
  column_name: string;
  table_name: string;
  schema_name: string;
}

export interface DatatableUpdate extends LazyLoadEvent {
  schemaName: string;
  tableName: string;
}

export interface SuggestionsQuery {
  column: DatatableColumn;
  value: string;
}
