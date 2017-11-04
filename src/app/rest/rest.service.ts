import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';

@Injectable()
export class RestClient {

  private _timeout = 3000;

  static createEndpoint(schemaName: string, endpoint: string) {
    const _domain = '.rochard.org';
    const _schemaName = schemaName.replace(/_/g, '');
    return 'https://' + _schemaName + _domain + endpoint
  }

  static createAuthorizationHeader(headers: HttpHeaders, token: string | null) {
    if (!!token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  get(schemaName: string, endpoint: string, params?: HttpParams): Observable<Object> {
    return this.store.take(1).switchMap(state => {
        let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
        headers = headers.set('prefer', 'return=representation');
        headers = headers.set('prefer', 'count=exact');
        return this.http.get(RestClient.createEndpoint(schemaName, endpoint),
          {
            headers: headers,
            observe: 'response',
            params: params,
          }).timeout(this._timeout);
      },
    );
  };

  post(schemaName: string, endpoint: string, data: any): Observable<Object> {
    return this.store.take(1).switchMap(state => {
        let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
        headers = headers.set('prefer', 'return=representation');
        return this.http.post(RestClient.createEndpoint(schemaName, endpoint), data,
          {
            headers: headers,
            observe: 'response',
          }).timeout(this._timeout);
      },
    );
  };

  delete(schemaName: string, endpoint: string, id: string): Observable<Object> {
    return this.store.take(1).switchMap(state => {
      const params: HttpParams = new HttpParams();
      let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
      headers = headers.set('prefer', 'return=minimal');
      params.set('id', 'eq.' + id);
      return this.http.delete(RestClient.createEndpoint(schemaName, endpoint), {
        headers: headers,
        observe: 'response',
        params: params,
      }).timeout(this._timeout);
    });
  }

  patch(schemaName: string, endpoint: string, data: any, params: HttpParams): Observable<Object> {
    return this.store.take(1).switchMap(state => {
      let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
      headers = headers.set('prefer', 'return=representation');
      return this.http.patch(RestClient.createEndpoint(schemaName, endpoint), data,
        {
          headers: headers,
          observe: 'response',
          params: params,
        }).timeout(this._timeout);
    });
  }

  constructor(private http: HttpClient,
              private store: Store<AppState>) {
  }

}
