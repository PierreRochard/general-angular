import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from "rxjs/Observable";
import {Store} from "@ngrx/store";

import * as fromRoot from '../reducers';

@Injectable()
export class RestClient {
  public apiEndpoint: string = "http://localhost:4545/";
  public token$: Observable<any>;

  constructor(private http: Http,
              private store: Store<fromRoot.State>,
  ) {
    this.token$ = store.select(fromRoot.getToken);
  }

  static createAuthorizationHeader(headers: Headers, token: string) {
    if (!!token) {
      headers.append('Authorization', 'Bearer ' + token );
    }
    headers.append("prefer", "return=representation");
    return headers;
  }

  get(endpoint): Observable<Response> {
    return this.token$.map(token => RestClient.createAuthorizationHeader(new Headers(), token))
      .switchMap(headers => this.http.get(this.apiEndpoint.concat(endpoint), {headers: headers}))
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error')
      })
  }

  post(endpoint, data): Observable<Response> {
    return this.token$.map(token => RestClient.createAuthorizationHeader(new Headers(), token))
      .switchMap(headers => this.http.post(this.apiEndpoint.concat(endpoint), data, {headers: headers}))
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error')
      })
  }

  // delete(endpoint, searchParam): Observable<Response> {
  //   let headers = new Headers();
  //   RestClient.createAuthorizationHeader(headers);
  //   return this.http.delete(this.apiEndpoint.concat(endpoint), {
  //     headers: headers,
  //     search: searchParam
  //   });
  // }
  //
  // patch(endpoint, data, searchParam): Observable<Response> {
  //   let headers = new Headers();
  //   RestClient.createAuthorizationHeader(headers);
  //   return this.http.patch(this.apiEndpoint.concat(endpoint), data, {
  //     headers: headers,
  //     search: searchParam
  //   });
  // }

}
