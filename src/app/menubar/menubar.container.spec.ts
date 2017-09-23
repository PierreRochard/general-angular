import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import 'rxjs/add/operator/map';

import { Store, StoreModule } from '@ngrx/store';

import { MenubarModule } from 'primeng/components/menubar/menubar';

import { AppState, metaReducers, reducers } from '../app.reducers';

import { GetMenubarAction, ReceiveMenubarAction } from './menubar.actions';
import { MenubarContainer } from './menubar.container';
import { menubarLoadingState } from './menubar.constants';
import { MenubarComponent } from './menubar.component';

const menubarAnonResponseMockData = require('../../../mock_data/menubar.anon.response.mock.json');
const menubarAnonMenuitemsMockData = require('../../../mock_data/menubar.anon.menuitems.mock.json');


describe('Component: MenubarContainer', () => {

  let component: MenubarContainer;
  let fixture: ComponentFixture<MenubarContainer>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let store: Store<AppState>;
  let action;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        MenubarContainer,
        MenubarComponent,
      ],
      imports: [
        CommonModule,
        MenubarModule,
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
