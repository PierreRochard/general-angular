import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { RestClient } from 'app/rest/rest.service';

import { AreRecordsLoadingAction } from './table.actions';
import { ColumnsVisibilityUpdate, Datatable, DatatableUpdate, RecordsUpdate } from './table.models';

@Injectable()
export class TableService {
  get_datatable(schemaName: string, tableName: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + tableName);
    params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/datatables', params)
  };

  update_pagination(updateData: DatatableUpdate): Observable<Response> {
    const newOffset = updateData.first;
    const newLimit = updateData.rows;
    const data = {
      row_offset: newOffset,
      row_limit: newLimit
    };
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + updateData.tableName);
    return this.restClient.patch('admin', '/datatables', data, params)
  };

  update_sort(updateData: DatatableUpdate): Observable<Response> {
    const data = {
      sort_column: updateData.sortField,
      sort_order: updateData.sortOrder
    };
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + updateData.tableName);
    return this.restClient.patch('admin', '/datatables', data, params)
  }

  get_datatable_columns(schemaName: string, tableName: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + tableName);
    params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/datatable_columns', params);
  };

  update_columns_visibility(updateData: ColumnsVisibilityUpdate): Observable<Response> {
    const data = {
      is_visible: updateData.isVisible
    };
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + updateData.tableName);
    params.set('value', 'in.' + updateData.columns.join(','));
    return this.restClient.patch('admin', '/datatable_columns', data, params)
  };

  get_records(datatable: Datatable): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    let sortDirection: string;
    params.set('limit', datatable.row_limit.toString());
    params.set('offset', datatable.row_offset.toString());
    if (datatable.sort_column !== null) {
      sortDirection = datatable.sort_order === 1 ? 'asc' : 'desc';
      params.set('order', datatable.sort_column + '.' + sortDirection);
    }

    this.store.dispatch(new AreRecordsLoadingAction(true));

    return this.restClient.get(datatable.schema_name, '/' + datatable.table_name, params);
  };

  update_record(updateData: RecordsUpdate): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    const data: any = {};
    data[updateData['column_name']] = updateData.data;
    params.set('id', 'eq.' + updateData.record_id);
    return this.restClient.patch('admin', '/' + updateData.table_name, data, params)
  };


  constructor(private restClient: RestClient,
              private store: Store<AppState>) {
  }
}
