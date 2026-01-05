import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthGuard } from './auth.guard';
import { AppState } from '../app.reducers';
import { selectToken } from './auth.selectors';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore<AppState>;
  let router: Router;
  const navigateSpy = jasmine.createSpy('navigate');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        provideMockStore({
          initialState: { auth: { token: 'abc' } } as any,
        }),
      ],
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callFake(navigateSpy);
  });

  it('allows activation when token exists', (done) => {
    store.overrideSelector(selectToken, 'token123');
    guard.canActivate({} as any, { url: '/home' } as any).subscribe(result => {
      expect(result).toBeTrue();
      expect(navigateSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it('blocks and redirects when token missing', (done) => {
    store.overrideSelector(selectToken, null);
    guard.canActivate({} as any, { url: '/secure' } as any).subscribe(result => {
      expect(result).toBeFalse();
      expect(navigateSpy).toHaveBeenCalledWith(['/auth/rpc/login'], {
        queryParams: { redirect: '/secure' },
      });
      done();
    });
  });
});
