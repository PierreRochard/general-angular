import { Injectable } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { RestClient } from 'app/rest/rest.service';

import { AreRecordsLoadingAction } from './table.actions';
import {
  ColumnsVisibilityUpdate, Datatable, DatatableColumn, DatatableUpdate,
  UpdateRecord, SuggestionsQuery, DeleteRecord,
} from './table.models';

@Injectable()
export class TableService {
  get_datatable(schemaName: string, tableName: string): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + tableName);
    params = params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/datatables', params)
  };

  get_datatable_columns(schemaName: string, tableName: string): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + tableName);
    params = params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/datatable_columns', params);
  };

  get_records(datatable: Datatable): Observable<Object> {
    let params: HttpParams = new HttpParams();
    let sortDirection: string;
    params = params.set('limit', datatable.row_limit.toString());
    params = params.set('offset', datatable.row_offset.toString());
    if (datatable.sort_column !== null) {
      sortDirection = datatable.sort_order === 1 ? 'asc' : 'desc';
      params = params.set('order', datatable.sort_column + '.' + sortDirection);
    }
    // datatable.filter_columns.map(column => {
    //     if (column.filter_value !== null) {
    //       params = params.set(column.column_name, 'ilike.*' + column.filter_value + '*');
    //     }
    //   },
    // );
    this.store.dispatch(new AreRecordsLoadingAction(true));

    return this.restClient.get(datatable.schema_name, '/' + datatable.table_name, params);
  };

  get_suggestions(query: SuggestionsQuery): Observable<Object> {
    let params: HttpParams = new HttpParams();
    const endpointName = '/' + query.column.suggestion_table_name;
    params = params.set('select', [query.column.suggestion_column_name, 'id'].join(','));
    params = params.set('order', query.column.suggestion_column_name);
    params = params.set('limit', '10');
    params = params.set(query.column.suggestion_column_name, 'ilike.*' + query.value + '*');
    return this.restClient.get(query.column.suggestion_schema_name, endpointName, params)
  }

  delete_record(deleteRecord: DeleteRecord): Observable<Object> {
    return this.restClient.delete(deleteRecord.schema_name, '/' + deleteRecord.table_name, deleteRecord.record_id)
  };

  update_columns_visibility(updateData: ColumnsVisibilityUpdate): Observable<Object> {
    const data = {
      is_visible: updateData.isVisible,
    };
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + updateData.tableName);
    params = params.set('value', 'in.' + updateData.columns.join(','));
    return this.restClient.patch('admin', '/datatable_columns', data, params)
  };

  update_keyword(updateData: any): Observable<Object> {
    const data = {
      filter_columns: [updateData.column],
    };
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + updateData.column.table_name);
    params = params.set('schema_name', 'eq.' + updateData.column.schema_name);
    return this.restClient.patch('admin', '/datatables', data, params)
  }

  update_pagination(updateData: DatatableUpdate): Observable<Object> {
    const newOffset = updateData.first;
    const newLimit = updateData.rows;
    const data = {
      row_offset: newOffset,
      row_limit: newLimit,
    };
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + updateData.tableName);
    return this.restClient.patch('admin', '/datatables', data, params)
  };

  update_record(updateData: UpdateRecord): Observable<Object> {
    let params: HttpParams = new HttpParams();
    const data: any = {};
    data[updateData['column_name']] = updateData.value;
    params = params.set('id', 'eq.' + updateData.record_id);
    return this.restClient.patch(updateData.schema_name, '/' + updateData.table_name, data, params)
  };

  update_sort(updateData: DatatableUpdate): Observable<Object> {
    const data = {
      sort_column: updateData.sortField,
      sort_order: updateData.sortOrder,
    };
    let params: HttpParams = new HttpParams();
    params = params.set('table_name', 'eq.' + updateData.tableName);
    return this.restClient.patch('admin', '/datatables', data, params)
  }


  constructor(private restClient: RestClient,
              private store: Store<AppState>) {
  }
}
