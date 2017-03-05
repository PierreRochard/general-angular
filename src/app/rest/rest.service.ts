import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';

import { Observable } from "rxjs/Observable";

import 'rxjs';

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

@Injectable()
export class RestClient {
  public apiEndpoint: string = "http://localhost:4545";

  constructor(private http: Http,
              private store: Store<fromRoot.State>,
  ) {}

  static createAuthorizationHeader(headers: Headers, token: string) {
    if (!!token) {
      headers.append('Authorization', 'Bearer ' + token );
    }
    return headers;
  }

  get(endpoint): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      let headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append("prefer", "return=representation");
      return this.http.get(this.apiEndpoint.concat(endpoint), {headers: headers})
      }
    )
  };

  post(endpoint, data): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      let headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append("prefer", "return=representation");
      return this.http.post(this.apiEndpoint.concat(endpoint), data, {headers: headers})
      }
    )
  };
  delete(endpoint, id): Observable<Response> {
    return this.store.take(1).switchMap(state => {
      let headers = RestClient.createAuthorizationHeader(new Headers(), state.auth.token);
      headers.append("prefer", "return=minimal");
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', 'eq.' + id);
      return this.http.delete(this.apiEndpoint.concat(endpoint), {
        headers: headers,
        search: params
      })
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

}
