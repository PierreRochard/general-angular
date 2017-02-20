import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from "rxjs/Observable";


@Injectable()
export class RestClient {
  public apiEndpoint: string = "http://localhost:4545/";
  constructor(private http: Http) {}

  static createAuthorizationHeader(headers: Headers) {
    let user_token = localStorage.getItem('user_token');
    if (!!user_token) {
      headers.append('Authorization', 'Bearer ' + user_token );
    }
    headers.append("prefer", "return=representation");
  }

  get(endpoint): Observable<Response> {
    console.log(this.apiEndpoint);
    let headers = new Headers();
    RestClient.createAuthorizationHeader(headers);
    return this.http.get(this.apiEndpoint.concat(endpoint), {
      headers: headers
    });
  }

  post(endpoint, data): Observable<Response> {
    let headers = new Headers();
    RestClient.createAuthorizationHeader(headers);
    return this.http.post(this.apiEndpoint.concat(endpoint), data, {
      headers: headers
    });
  }

  delete(endpoint, searchParam): Observable<Response> {
    let headers = new Headers();
    RestClient.createAuthorizationHeader(headers);
    return this.http.delete(this.apiEndpoint.concat(endpoint), {
      headers: headers,
      search: searchParam
    });
  }

  patch(endpoint, data, searchParam): Observable<Response> {
    let headers = new Headers();
    RestClient.createAuthorizationHeader(headers);
    return this.http.patch(this.apiEndpoint.concat(endpoint), data, {
      headers: headers,
      search: searchParam
    });
  }

}
