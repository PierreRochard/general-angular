import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';

@Injectable()
export class RestClient {

  private _timeout = 3000;

  static createEndpoint(schema: string, endpoint: string) {
    const _domain = '.rochard.org';
    return 'https://' + schema + _domain + endpoint
  }

  static createAuthorizationHeader(headers: Headers, token: string) {
    if (!!token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  get(schema: string, endpoint: string, params?: URLSearchParams): Observable<Response> {
    return this.store.take(1).switchMap(state => {
        const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
        headers.append('prefer', 'return=representation');
        headers.append('prefer', 'count=exact');
        return this.http.get(RestClient.createEndpoint(schema, endpoint),
          {
            headers: headers,
            search: params
          }).timeout(this._timeout);
      }
    );
  };

  post(schema: string, endpoint: string, data: any): Observable<Response> {
    return this.store.take(1).switchMap(state => {
        const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
        headers.append('prefer', 'return=representation');
        return this.http.post(RestClient.createEndpoint(schema, endpoint), data, {headers: headers}).timeout(this._timeout);
      }
    );
  };

  delete(schema: string, endpoint:string, id: string): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      const params: URLSearchParams = new URLSearchParams();
      const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append('prefer', 'return=minimal');
      params.set('id', 'eq.' + id);
      return this.http.delete(RestClient.createEndpoint(schema, endpoint), {
        headers: headers,
        search: params
      }).timeout(this._timeout);
    });
  }

  patch(schema: string, endpoint: string, data: any, params: URLSearchParams): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append('prefer', 'return=representation');
      return this.http.patch(RestClient.createEndpoint(schema, endpoint), data,
        {
          headers: headers,
          search: params
        }).timeout(this._timeout);
    });
  }

  constructor(private http: Http,
              private store: Store<AppState>,) {
  }

}
