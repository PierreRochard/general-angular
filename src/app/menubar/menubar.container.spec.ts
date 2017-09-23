import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { ButtonModule } from 'primeng/components/button/button';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PasswordModule } from 'primeng/components/password/password';

import { AppState, metaReducers, reducers } from '../app.reducers';

import { MenubarContainer } from './menubar.container';
import { ReceiveMenubarAction } from './menubar.actions';
import { MenubarComponent } from 'app/menubar/menubar.component';
import { MenubarModule } from 'primeng/primeng';

const menubarAdminMockData = require('../../../mock_data/menubar.admin.mock.json');
const menubarAnonMockData = require('../../../mock_data/menubar.anon.mock.json');

import 'rxjs/add/operator/map';
import { RouterTestingModule } from '@angular/router/testing';


fdescribe('Component: MenubarContainer', () => {

  let cp: MenubarContainer;
  let fixture: ComponentFixture<MenubarContainer>;
  let ne: HTMLElement;
  let de: DebugElement;

  let store: Store<AppState>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        MenubarContainer,
        MenubarComponent,
      ],
      imports: [
        StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
        ButtonModule,
        CommonModule,
        FieldsetModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MenubarModule,
      ],
      providers: [],
    });
    testBed.compileComponents();
    store = testBed.get(Store);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarContainer);

    cp = fixture.componentInstance;
    de = fixture.debugElement;
    ne = fixture.nativeElement;

    const action = new ReceiveMenubarAction(menubarAnonMockData);
    store.dispatch(action);

    fixture.detectChanges();
  });

  it('will subscribe to items$', () => {

    cp.items$.subscribe(data => {
      expect(data).toEqual([{
        label: 'Login',
        icon: 'fa-pencil-square-o',
        routerLink: ['/', 'auth', 'rpc', 'login'],
      }]);
    });
  });


});
