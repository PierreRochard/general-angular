import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { RestClient } from 'app/rest/rest.service';

import { AreRecordsLoadingAction } from './table.actions';
import { ColumnsVisibilityUpdate, Datatable, MultiselectOutput } from './table.models';
import { LazyLoadEvent } from 'primeng/primeng';

@Injectable()
export class TableService {
  get_datatable(table_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', 'eq.' + table_name);
    return this.restClient.get('/datatable', params)
  };

  update_datatable_pagination(updateData: LazyLoadEvent): Observable<Response> {
    const newOffset = updateData.first;
    const data = {
      offset: newOffset
    };
    return this.store.take(1).switchMap(state => {
      const params: URLSearchParams = new URLSearchParams();
      params.set('name', 'eq.' + state.table.tableName);
      return this.restClient.patch('/datatable', data, params)
    })
  };

  get_datatable_columns(table_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + table_name);
    return this.restClient.get('/datatable_columns', params);
  };

  update_columns_visibility(updateData: ColumnsVisibilityUpdate): Observable<Response> {
    const data = {
      is_visible: updateData.isVisible
    };
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + updateData.tableName);
    params.set('value', 'in.' + updateData.columns.join(','));
    return this.restClient.patch('/datatable_columns', data, params)
  };

  get_records(datatable: Datatable): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', datatable.limit.toString());
    params.set('offset', datatable.offset.toString());

    this.store.dispatch(new AreRecordsLoadingAction(true));

    return this.restClient.get('/' + datatable.name, params);
  };

  constructor(private restClient: RestClient,
              private store: Store<AppState>) {
  }
}
