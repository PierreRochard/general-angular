import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import {AppState} from '../app.reducers';

@Injectable()
export class RestClient {
  public apiEndpoint = 'https://api.rochard.org';

  static createAuthorizationHeader(headers: Headers, token: string) {
    if (!!token) {
      headers.append('Authorization', 'Bearer ' + token );
    }
    return headers;
  }

  get(endpoint): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append('prefer', 'return=representation');
      return this.http.get(this.apiEndpoint.concat(endpoint), {headers: headers});
      }
    );
  };

  post(endpoint, data): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append('prefer', 'return=representation');
      return this.http.post(this.apiEndpoint.concat(endpoint), data, {headers: headers});
      }
    );
  };
  delete(endpoint, id): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      const params: URLSearchParams = new URLSearchParams();
      const headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append('prefer', 'return=minimal');
      params.set('id', 'eq.' + id);
      return this.http.delete(this.apiEndpoint.concat(endpoint), {
        headers: headers,
        search: params
      });
    });
  }
  //
  // patch(endpoint, records, searchParam): Observable<Response> {
  //   let headers = new Headers();
  //   RestClient.createAuthorizationHeader(headers);
  //   return this.http.patch(this.apiEndpoint.concat(endpoint), records, {
  //     headers: headers,
  //     search: searchParam
  //   });
  // }
  constructor(private http: Http,
              private store: Store<AppState>,
  ) {}

}
