import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class TableService {
  get_table_records(table_name: string): Observable<Response> {
    return this.restClient.get('/' + table_name);
  };
  get_table_column_settings(table_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + table_name);
    return this.restClient.get('/datatable', params);
  };
  constructor(private restClient: RestClient) {}
}
