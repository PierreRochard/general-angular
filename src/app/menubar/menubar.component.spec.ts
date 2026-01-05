import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { menubarLoadingState } from './menubar.constants';
import { MenubarComponent } from './menubar.component';

const menubarAnonMenuitemsMockData = require('../../../mock_data/menubar/menubar.anon.menuitems.mock.json');


describe('Component: MenubarComponent', () => {

  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;
  let nativeElement: HTMLElement;
  let testNativeElement: HTMLElement;
  let debugElement: DebugElement;
  let loader: HarnessLoader;

  let getDebugElement: Function;
  let getNativeElement: Function;

beforeEach(waitForAsync(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        MenubarComponent,
      ],
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    getDebugElement = (selector: string): DebugElement => {
      return debugElement.query(By.css(selector));
    };

    getNativeElement = (selector: string): HTMLElement => {
      return getDebugElement(selector).nativeElement;
    };

  });

  it('should render PrimeNG menubar component', () => {
    component.items = menubarLoadingState;
    fixture.detectChanges();
    testNativeElement = getNativeElement('mat-toolbar');
    expect(testNativeElement).toBeDefined();
  });

  describe(' unloaded ', () => {

    beforeEach(() => {
      component.items = menubarLoadingState;
      fixture.detectChanges();
    });

    it('should render Loading menuitem', () => {
      testNativeElement = getNativeElement('button');
      expect(testNativeElement.textContent).toContain(menubarLoadingState[0].label);
    });

  });

  describe(' for anon ', () => {

    beforeEach(() => {
      component.items = menubarAnonMenuitemsMockData;
      fixture.detectChanges();
    });

    it('should render Login menuitem', () => {
      testNativeElement = getNativeElement('button');
      expect(testNativeElement.textContent).toContain(menubarAnonMenuitemsMockData[0].label);
    });

    it('exposes toolbar and login button via Material harnesses', async () => {
      const toolbar = await loader.getHarness(MatToolbarHarness);
      const rows = await toolbar.getRowsAsText();
      expect(rows[0]).toContain('Data Browser');

      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      const buttonTexts = await Promise.all(buttons.map(btn => btn.getText()));
      expect(buttonTexts.some(text => text.includes('Login'))).toBeTrue();
    });
  })

});
