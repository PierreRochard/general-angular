import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';

import { back, forward, go } from './router.actions';
import { RouterEffects } from './router.effects';

describe('RouterEffects', () => {
  let actions$: ReplaySubject<Action>;
  let router: Router;
  let location: Location;
  let effects: RouterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        RouterEffects,
        provideMockActions(() => actions$),
        { provide: Location, useClass: SpyLocation },
      ],
    });

    actions$ = new ReplaySubject<Action>(1);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    effects = TestBed.inject(RouterEffects);
  });

  it('navigates on go action', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const sub = effects.navigate$.subscribe();
    actions$.next(go({ path: ['/table', 'items'], query: { q: 'abc' } }));
    expect(navigateSpy).toHaveBeenCalledWith(['/table', 'items'], { queryParams: { q: 'abc' } });
    sub.unsubscribe();
  });

  it('navigates back on back action', () => {
    const backSpy = spyOn(location, 'back');
    const sub = effects.navigateBack$.subscribe();
    actions$.next(back());
    expect(backSpy).toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('navigates forward on forward action', () => {
    const forwardSpy = spyOn(location, 'forward');
    const sub = effects.navigateForward$.subscribe();
    actions$.next(forward());
    expect(forwardSpy).toHaveBeenCalled();
    sub.unsubscribe();
  });
});
