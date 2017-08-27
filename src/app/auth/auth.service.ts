import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RestClient} from 'app/rest/rest.service';

import {LoginData} from "./auth.models";

@Injectable()
export class AuthService {
  post_login(loginPath: string, loginData: LoginData): Observable<Response> {
    return this.restClient.post('auth', loginPath, loginData);
  };
  constructor(private restClient: RestClient) {}
}
