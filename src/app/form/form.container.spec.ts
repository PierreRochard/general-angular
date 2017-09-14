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

import { FormContainer } from './form.container';
import { ReceiveFormSettingsAction } from './form.actions';
import { FormComponent } from './form.component';
import { FormService } from './form.service';
import { FormElementComponent } from './form-element.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


fdescribe('Component: FormContainer', () => {

  let cp: FormContainer;
  let fixture: ComponentFixture<FormContainer>;
  let ne: HTMLElement;
  let de: DebugElement;

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
        FormContainer,
        FormComponent,
        FormElementComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
        ButtonModule,
        CommonModule,
        FieldsetModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormService,

      ],
    });
    testBed.compileComponents();
    store = testBed.get(Store);

    const action = new ReceiveFormSettingsAction(form_settings_data);
    store.dispatch(action);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainer);

    cp = fixture.componentInstance;
    de = fixture.debugElement;
    ne = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('will subscribe to formSettings$', () => {

    cp.formSettings$.subscribe(data => {
      expect(data).toBe(form_settings_data[0]);
    });
  });


});
