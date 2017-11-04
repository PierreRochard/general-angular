import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RestClient } from 'app/rest/rest.service';

import { LoginData } from './auth.models';

@Injectable()
export class AuthService {
  post_login(schemaName: string, formName: string, loginData: LoginData): Observable<Object> {
    const loginPath = '/rpc/' + formName;
    return this.restClient.post(schemaName, loginPath, loginData);
  };

  constructor(private restClient: RestClient) {
  }
}
