import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';

import { Store, StoreModule } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { AppState, reducers } from '../app.reducers';
import { RouterStateUrl } from 'app/router/router.serializer';

import { FormContainer } from './form.container';
import { FormService } from './form.service';
import { AppFormModule } from './form.module';
import { FormState } from './form.reducers';
import { SelectFormAction } from './form.actions';

const loginRouterMockData: RouterReducerState<RouterStateUrl> = require('../../../mock_data/form/login.router.mock.json');
const loginFormMockData: FormState = require('../../../mock_data/form/login.form.mock.json');


fdescribe('Component: FormContainer', () => {

  let component: FormContainer;
  let fixture: ComponentFixture<FormContainer>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let store: Store<AppState>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppFormModule,
        StoreModule.forRoot(reducers, {
          initialState: {
            form: loginFormMockData,
            routerReducer: loginRouterMockData,
          },
        }),
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormService,
      ],
    });
    testBed.compileComponents();
    store = testBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainer);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });
  describe('login form initialize', () => {
    it('will subscribe to formFieldSettings$', () => {
      component.formFieldSettings$.subscribe(data => {
        expect(data).toEqual(loginFormMockData.fieldSettings);
      });
    });

    it('will subscribe to formSettings$', () => {
      component.formSettings$.subscribe(data => {
        expect(data).toEqual(loginFormMockData.formSettings);
      });
    });

    it('will subscribe to selectedRouteParams$', () => {
      component.selectedRouteParams$.subscribe(data => {
        expect(data).toEqual(loginRouterMockData.state.params);
      });
    });
    it('will dispatch SelectFormAction', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SelectFormAction(loginRouterMockData.state.params));
    });
  });

});
