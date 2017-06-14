import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class FormService {
  get_form_field_settings(): Observable<Response> {
    return this.restClient.get('/form_field_settings');
  };
  constructor(private restClient: RestClient) {}
}
