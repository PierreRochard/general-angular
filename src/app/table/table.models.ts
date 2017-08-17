import { LazyLoadEvent } from 'primeng/primeng';

export interface Datatable {
  name: string;
  header: string;
  limit: number;
  offset: number;
  sort_column: string;
  sort_order: number;
}

export interface DatatableColumn {
  data_type: string;
  editable: boolean;
  filter_match_mode: string;
  filter_value: string;
  format_pattern: string;
  input_type: string;
  is_filterable: boolean;
  is_sortable: boolean;
  is_visible: boolean;
  label: string;
  table_name: string;
  value: string;
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
