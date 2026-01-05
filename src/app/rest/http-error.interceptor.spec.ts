import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor, HttpErrorInterceptorProvider } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    spyOn(console, 'error');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpErrorInterceptorProvider,
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('logs and rethrows HTTP errors', () => {
    let captured: HttpErrorResponse | undefined;
    http.get('/fail').subscribe({
      error: (err) => { captured = err; },
    });
    const req = httpMock.expectOne('/fail');
    req.flush({ message: 'nope' }, { status: 500, statusText: 'Server Error' });

    expect(captured?.status).toBe(500);
    expect((console.error as jasmine.Spy)).toHaveBeenCalled();
  });

  it('passes through successful responses', () => {
    let body: any;
    http.get('/ok').subscribe(res => body = res);
    const req = httpMock.expectOne('/ok');
    req.flush({ data: true });
    expect(body).toEqual({ data: true });
  });
});
