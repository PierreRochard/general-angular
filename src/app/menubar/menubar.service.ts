import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {AppState} from '../app.reducers';
import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class MenubarService {
  get(): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('select', '"label,items{label, icon}"');
    return this.restClient.get('/submenus', params);
  };
  constructor(private restClient: RestClient) {}

}
