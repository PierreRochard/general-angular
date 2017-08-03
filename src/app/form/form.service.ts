import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class FormService {
  get_form_field_settings(form_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('form_name', 'eq.' + form_name);
    return this.restClient.get('/default_form_field_settings', params);
  };
  constructor(private restClient: RestClient) {}
}
