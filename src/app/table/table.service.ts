import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class TableService {
  get_table_column_settings(form_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('table_name', 'eq.' + form_name);
    return this.restClient.get('/table_column_settings');
  };
  constructor(private restClient: RestClient) {}
}
