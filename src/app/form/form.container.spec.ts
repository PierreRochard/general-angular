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

const routerMockData: RouterReducerState<RouterStateUrl> = require('../../../mock_data/form/login.router.mock.json');
const formMockData: FormState = require('../../../mock_data/form/login.form.mock.json');


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
            form: formMockData,
            routerReducer: routerMockData,
            table: null,
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
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainer);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('will subscribe to formSettings$', () => {

    component.formSettings$.subscribe(data => {
      expect(data).toEqual(formMockData.formSettings);
    });
  });


});
