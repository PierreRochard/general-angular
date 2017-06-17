import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class FormService {
  get_form_field_settings(form_name: string): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('form_name', 'eq.' + form_name);
    return this.restClient.get('/form_field_settings');
  };
  constructor(private restClient: RestClient) {}
}
