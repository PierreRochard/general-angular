import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppState, metaReducers, reducers } from '../app.reducers';

import { GetMenubarAction, ReceiveMenubarAction } from './menubar.actions';
import { MenubarContainer } from './menubar.container';
import { menubarLoadingState } from './menubar.constants';
import { MenubarComponent } from './menubar.component';

const menubarAnonResponseMockData = require('../../../mock_data/menubar/menubar.anon.response.mock.json');
const menubarAnonMenuitemsMockData = require('../../../mock_data/menubar/menubar.anon.menuitems.mock.json');


describe('Component: MenubarContainer', () => {

  let component: MenubarContainer;
  let fixture: ComponentFixture<MenubarContainer>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let store: Store<AppState>;
  let action;

  beforeEach(waitForAsync(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        MenubarContainer,
        MenubarComponent,
      ],
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
      ],
      providers: [],
    });
    testBed.compileComponents();
    store = testBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarContainer);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  describe(' unloaded ', () => {

    it('should subscribe to items$', () => {
      component.items$.subscribe(data => {
        expect(data).toEqual(menubarLoadingState);
      });
    });

    it('should dispatch a GetMenubarAction', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GetMenubarAction());
    });

  });

  describe(' for anon ', () => {

    beforeEach(() => {
      action = new ReceiveMenubarAction(menubarAnonResponseMockData);
      store.dispatch(action);
    });

    it('should subscribe to items$', () => {
      component.items$.subscribe(data => {
        expect(data).toEqual(menubarAnonMenuitemsMockData);
      });
    });
  })

});
