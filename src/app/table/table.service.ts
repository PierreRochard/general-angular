import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {AppState} from '../app.reducers';
import {RestClient} from 'app/rest/rest.service';

import {AreRecordsLoadingAction} from './table.actions';
import { Datatable } from './table.models';

@Injectable()
export class TableService {
  get_records(datatable: Datatable): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', datatable.limit.toString());
    params.set('offset', datatable.offset.toString());

    this.store.dispatch(new AreRecordsLoadingAction(true));

    return this.restClient.get('/' + datatable.name, params);
  };
  get_datatable(table_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', 'eq.' + table_name);
    return this.restClient.get('/datatable', params)
  };
  get_datatable_columns(table_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + table_name);
    return this.restClient.get('/datatable_columns', params);
  };
  constructor(private restClient: RestClient,
              private store: Store<AppState>) {}
}
