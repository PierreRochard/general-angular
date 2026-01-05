import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';

import { menubarReducer, MenubarState } from './menubar.reducers';
import { receiveMenubar } from './menubar.actions';
import { selectMenuItems } from './menubar.selectors';

describe('Menubar store integration', () => {
  let store: Store<{ menubar: MenubarState }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ menubar: menubarReducer })],
    });
    store = TestBed.inject(Store);
  });

  it('cleans and exposes menu items via selector after dispatch', async () => {
    store.dispatch(receiveMenubar({
      items: [
        { label: 'Home', routerLink: '/' },
        { label: 'Login', routerLink: '/auth/rpc/login', disabled: false, icon: null },
      ] as any,
    }));

    const items = await firstValueFrom(store.select(selectMenuItems).pipe(take(1)));

    expect(items?.length).toBe(2);
    expect(items?.[0].label).toBe('Home');
    expect(items?.[1].routerLink).toBe('/auth/rpc/login');
  });
});
