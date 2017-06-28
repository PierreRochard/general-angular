import {FilterMetadata, LazyLoadEvent, SortMeta} from "primeng/primeng";
export interface Datatable {
  name: string;
  header: string;
  limit: number;
  offset: number;
  sort_column: string;
  sort_order: number;
}

export interface DatatableColumns {
  filter_match_mode: string;
  filter_value: string;
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

export interface DatatableUpdate extends LazyLoadEvent {
  tableName: string;
}
