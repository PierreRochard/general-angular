import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retry, switchMap, take, timeout } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { REST_CONFIG, RestConfig } from './rest.config';

@Injectable()
export class RestClient {

  constructor(private http: HttpClient,
              private store: Store<AppState>,
              @Inject(REST_CONFIG) private restConfig: RestConfig) {
  }

  private createEndpoint(schemaName: string, endpoint: string) {
    const sanitizedSchema = schemaName.replace(/_/g, '');
    return this.restConfig.apiBaseTemplate.replace('{schema}', sanitizedSchema) + endpoint;
  }

  private static createAuthorizationHeader(headers: HttpHeaders, token: string | null) {
    if (!!token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  private withCommonConfig<T>(request$: Observable<T>): Observable<T> {
    return request$.pipe(
      timeout(this.restConfig.defaultTimeoutMs),
      retry({ count: this.restConfig.retryCount, delay: this.restConfig.retryDelayMs }),
    );
  }

  get(schemaName: string, endpoint: string, params?: HttpParams): Observable<Object> {
    return this.store.pipe(
      take(1),
      switchMap(state => {
        let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
        headers = headers.set('prefer', 'return=representation');
        headers = headers.set('prefer', 'count=exact');
        return this.withCommonConfig(this.http.get(this.createEndpoint(schemaName, endpoint), {
          headers: headers,
          observe: 'response',
          params: params,
        }));
      }));
  };

  post(schemaName: string, endpoint: string, data: any): Observable<Object> {
    return this.store.pipe(
      take(1),
      switchMap(state => {
        let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
        headers = headers.set('prefer', 'return=representation');
        return this.withCommonConfig(this.http.post(this.createEndpoint(schemaName, endpoint), data, {
          headers: headers,
          observe: 'response',
        }));
      }));
  };

  delete(schemaName: string, endpoint: string, id: string): Observable<Object> {
    return this.store.pipe(
      take(1),
      switchMap(state => {
      let params: HttpParams = new HttpParams();
      let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
      headers = headers.set('prefer', 'return=minimal');
      params = params.set('id', 'eq.' + id);
      return this.withCommonConfig(this.http.delete(this.createEndpoint(schemaName, endpoint), {
        headers: headers,
        observe: 'response',
        params: params
      }));
    }));
  }

  patch(schemaName: string, endpoint: string, data: any, params: HttpParams): Observable<Object> {
    return this.store.pipe(
      take(1),
      switchMap(state => {
      let headers = RestClient.createAuthorizationHeader(new HttpHeaders(), state.auth.token);
      headers = headers.set('prefer', 'return=representation');
      return this.withCommonConfig(this.http.patch(this.createEndpoint(schemaName, endpoint), data, {
        headers: headers,
        observe: 'response',
        params: params
      }));
    }));
  }
}
