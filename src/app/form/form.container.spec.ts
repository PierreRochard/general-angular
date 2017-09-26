import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterStateSnapshot } from '@angular/router';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

import { RouterNavigationAction } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';

import { ButtonModule } from 'primeng/components/button/button';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PasswordModule } from 'primeng/components/password/password';

import { AppState, metaReducers, reducers } from '../app.reducers';

import { ReceiveFormSettingsAction } from './form.actions';
import { FormContainer } from './form.container';
import { FormComponent } from './form.component';
import { FormElementComponent } from './form-element.component';
import { FormService } from './form.service';
import { Go } from '../router/router.actions';
import { RouterEffects } from '../router/router.effects';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { routing } from '../app.routing';
import { HomeContainer } from '../home/home.container';
import { TableContainer } from '../table/table.container';
import { AppFormModule } from './form.module';
import { AppTableModule } from '../table/table.module';
import { Observable } from 'rxjs/Observable';
import { RouteParams } from '../router/router.models';

const loginRouterActionMockData: RouterStateSnapshot = require('../../../mock_data/form/login.router.action.mock.json');

export class DataStub {
  public static get(): Observable<RouteParams> {
    return Observable.of({
      'selectedObjectName': 'login',
      'selectedSchemaName': 'auth',
      'selectedObjectType': 'form',
    });
  }
}


xdescribe('Component: FormContainer', () => {

  let component: FormContainer;
  let fixture: ComponentFixture<FormContainer>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let store: Store<AppState>;


  const form_settings_data = [{
    id: 1,
    custom_name: 'Login',
    form_name: 'login',
    schema_name: 'auth',
    user_id: '4bbed106-90a6-4371-91c9-c074f3cdf4bb',
  }];

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        AppFormModule,
        StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
        RouterTestingModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([RouterEffects]),
      ],
      providers: [
        FormService,

      ],
    });
    testBed.compileComponents();
    store = testBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    const action = new ReceiveFormSettingsAction(form_settings_data);
    store.dispatch(action);
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
      expect(data).toBe(form_settings_data[0]);
    });
  });


});
