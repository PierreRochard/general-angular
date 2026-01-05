import {Injectable} from '@angular/core';
import { HttpParams } from '@angular/common/http';

import {Observable} from 'rxjs';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class FormService {
  get_form_field_settings(schemaName: string, formName: string): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.set('form_name', 'eq.' + formName);
    params = params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/form_fields', params);
  };
  get_form_settings(schemaName: string, formName: string): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.set('form_name', 'eq.' + formName);
    params = params.set('schema_name', 'eq.' + schemaName);
    return this.restClient.get('admin', '/forms', params);
  };
  constructor(private restClient: RestClient) {}
}
