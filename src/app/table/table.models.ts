import { LazyLoadEvent } from 'primeng/primeng';

export interface Datatable {
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
  table_name: string;
  user_id: string;
}

export interface MultiselectOutput {
  added: string[];
  removed: string[];
  tableName?: string;
}

export interface ColumnsVisibilityUpdate {
  columns: string[];
  tableName: string;
  isVisible: boolean;
}

export interface RecordsUpdate {
  column_name: string;
  data: any;
  record_id: any;
  table_name: string;
}

export interface DatatableUpdate extends LazyLoadEvent {
  tableName: string;
}
