import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { RestClient } from 'app/rest/rest.service';

@Injectable()
export class MenubarService {
  get(): Observable<Response> {
    return this.restClient.get('admin', '/menubar');
  };

  constructor(private restClient: RestClient) {
  }
}
