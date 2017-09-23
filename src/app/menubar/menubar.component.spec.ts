import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/operator/map';

import { MenubarModule } from 'primeng/components/menubar/menubar';

import { menubarLoadingState } from './menubar.constants';
import { MenubarComponent } from './menubar.component';
import { By } from '@angular/platform-browser';

const menubarAnonMenuitemsMockData = require('../../../mock_data/menubar.anon.menuitems.mock.json');


fdescribe('Component: MenubarContainer', () => {

  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;
  let nativeElement: HTMLElement;
  let testNativeElement: HTMLElement;
  let debugElement: DebugElement;
  let testDebugElement: DebugElement;

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

  describe(' unloaded ', () => {

    beforeEach(() => {
      component.items = menubarLoadingState;
      fixture.detectChanges();
    });

    it('should subscribe to items$', () => {
      console.log(nativeElement);
      expect(nativeElement).toEqual(null);
    });

  });

  describe(' for anon ', () => {

    beforeEach(() => {
      component.items = menubarAnonMenuitemsMockData;
      fixture.detectChanges();
    });

    it('should subscribe to items$', () => {
      expect(nativeElement).toEqual(null);
    });
  })

});
