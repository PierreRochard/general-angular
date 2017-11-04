import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RestClient } from 'app/rest/rest.service';

@Injectable()
export class MenubarService {
  get(): Observable<Object> {
    return this.restClient.get('admin', '/menubar');
  };

  constructor(private restClient: RestClient) {
  }
}
