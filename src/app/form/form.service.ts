import {Injectable} from '@angular/core';
import { HttpParams } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class FormService {
  get_form_field_settings(schemaName: string, formName: string): Observable<Object> {
    const params: HttpParams = new HttpParams();
    params.set('form_name', 'eq.' + formName);
    params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/form_fields', params);
  };
  get_form_settings(schemaName: string, formName: string): Observable<Object> {
    const params: HttpParams = new HttpParams();
    params.set('form_name', 'eq.' + formName);
    params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/forms', params);
  };
  constructor(private restClient: RestClient) {}
}
