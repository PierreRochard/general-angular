import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AppState } from '../app.reducers';
import { removeToken } from './auth.actions';
import { selectToken } from './auth.selectors';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let store: MockStore<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState: { auth: { token: 'abc' } } as any }),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('attaches bearer token when available', () => {
    store.overrideSelector(selectToken, 'token-123');
    http.get('/secure').subscribe();
    const req = httpMock.expectOne('/secure');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token-123');
    req.flush({ ok: true });
  });

  it('strips token and navigates on 401', () => {
    store.overrideSelector(selectToken, 'token-123');
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    http.get('/secure').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      },
    });

    const req = httpMock.expectOne('/secure');
    req.flush({ message: 'unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(dispatchSpy).toHaveBeenCalledWith(removeToken());
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/rpc/login']);
  });
});
