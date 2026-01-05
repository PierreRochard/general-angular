import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '../app.reducers';
import { selectToken } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      take(1),
      map(token => !!token),
      tap(hasToken => {
        if (!hasToken) {
          this.router.navigate(['/auth/rpc/login'], {
            queryParams: { redirect: state.url },
          });
        }
      }),
    );
  }
}
