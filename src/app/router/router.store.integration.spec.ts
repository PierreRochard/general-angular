import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';
import { routerNavigationAction, routerReducer, RouterReducerState } from '@ngrx/router-store';

import { getCurrentParams, getCurrentUrl } from '../app.reducers';
import { RouterStateUrl } from './router.serializer';

describe('Router store integration', () => {
  let store: Store<{ router: RouterReducerState<RouterStateUrl> }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ router: routerReducer })],
    });
    store = TestBed.inject(Store);
  });

  it('maintains router state under key "router" and serves selectors', async () => {
    store.dispatch(routerNavigationAction({
      payload: {
        routerState: {
          url: '/table/accounts',
          params: { selectedObjectName: 'accounts', selectedSchemaName: 'chart_of_accounts', selectedObjectType: 'table' },
          queryParams: { q: 'search' },
        } as any,
        event: {
          id: 1,
          url: '/table/accounts',
          urlAfterRedirects: '/table/accounts',
          restoredState: null,
          trigger: 'imperative',
        } as any,
      },
    }));

    const url = await firstValueFrom(store.select(getCurrentUrl).pipe(take(1)));
    const params = await firstValueFrom(store.select(getCurrentParams).pipe(take(1)));

    expect(url).toBe('/table/accounts');
    expect(params?.selectedObjectName).toBe('accounts');
    expect(params?.selectedSchemaName).toBe('chart_of_accounts');
  });
});
