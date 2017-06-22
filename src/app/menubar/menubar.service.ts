import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

@Injectable()
export class MenubarService {
  get(): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('select', 'label,icon, routerLink, items{label, icon, routerLink}');
    params.set('is_visible', 'is.true');
    return this.restClient.get('/menubar', params);
  };
  constructor(private restClient: RestClient) {}
}
