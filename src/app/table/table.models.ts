import { Column, LazyLoadEvent } from 'primeng/primeng';

export interface ColumnResizeEvent {
  element: HTMLElement;
  delta: number;
}

export interface ColumnsVisibilityUpdate {
  columns: string[];
  isVisible: boolean;
  schemaName: string;
  tableName: string;
}

export interface EditEvent {
  column: Column;
  data: any;
  index: number;
}

export interface Datatable {
  can_archive: boolean;
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
  filter_columns: Array<DatatableColumn>;
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
  is_multiple: boolean;
  is_select_item: boolean;
  is_sortable: boolean;
  is_visible: boolean;
  schema_name: string;
  select_item_label_column_name: string;
  select_item_schema_name: string;
  select_item_table_name: string;
  select_item_value_column_name: string;
  styles: Styles;
  suggestion_column_name: string;
  suggestion_schema_name: string;
  suggestion_table_name: string;
  table_name: string;
  user_id: string;
}

export interface DatatableUpdate extends LazyLoadEvent {
  schemaName: string;
  tableName: string;
}

export interface MultiselectOutput {
  added: DatatableColumn[];
  removed: DatatableColumn[];
  schemaName?: string;
  tableName?: string;
}

export interface DeleteRecord {
  record_id: any;
  table_name: string;
  schema_name: string;
}

export interface UpdateRecord {
  value: any;
  record_id: any;
  column_name: string;
  table_name: string;
  schema_name: string;
}

export interface Styles {
  height: string;
  overflow: string;
  'padding-bottom': string;
  'padding-left': string;
  'padding-right': string;
  'padding-top': string;
  width: string;
}

export interface SuggestionsQuery {
  column: DatatableColumn;
  value: string;
}
