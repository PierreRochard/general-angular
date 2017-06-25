export interface Datatable {
  name: string;
  header: string;
  limit: number;
  offset: number;
}

export interface DatatableColumns {
  table_name: string;
  field: string;
  header: string;
}
