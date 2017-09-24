import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/operator/map';

import { MenubarModule } from 'primeng/components/menubar/menubar';

import { menubarLoadingState } from './menubar.constants';
import { MenubarComponent } from './menubar.component';

const menubarAnonMenuitemsMockData = require('../../../mock_data/menubar/menubar.anon.menuitems.mock.json');


describe('Component: MenubarComponent', () => {

  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;
  let nativeElement: HTMLElement;
  let testNativeElement: HTMLElement;
  let debugElement: DebugElement;

  let getDebugElement: Function;
  let getNativeElement: Function;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        MenubarComponent,
      ],
      imports: [
        CommonModule,
        MenubarModule,
        RouterTestingModule
      ],
      providers: [],
    });
    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    getDebugElement = (selector: string): DebugElement => {
      return debugElement.query(By.css(selector));
    };

    getNativeElement = (selector: string): HTMLElement => {
      return getDebugElement(selector).nativeElement;
    };

    fixture.detectChanges();
  });

  it('should render PrimeNG menubar component', () => {
    testNativeElement = getNativeElement('p-menubar');
    expect(testNativeElement).toBeDefined();
  });

  describe(' unloaded ', () => {

    beforeEach(() => {
      component.items = menubarLoadingState;
      fixture.detectChanges();
    });

    it('should render Loading menuitem', () => {
      testNativeElement = getNativeElement('.ui-menuitem-text');
      expect(testNativeElement.textContent).toEqual(menubarLoadingState[0].label);
    });

  });

  describe(' for anon ', () => {

    beforeEach(() => {
      component.items = menubarAnonMenuitemsMockData;
      fixture.detectChanges();
    });

    it('should render Login menuitem', () => {
      testNativeElement = getNativeElement('.ui-menuitem-text');
      expect(testNativeElement.textContent).toEqual(menubarAnonMenuitemsMockData[0].label);
    });
  })

});
