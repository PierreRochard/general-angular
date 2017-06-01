/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GrowlContainer } from './common/growl.container';
import { MenubarContainer } from 'app/menubar/menubar.container';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs'
import { GrowlModule, MenubarModule } from 'primeng/primeng';
import { reducer } from './app.reducers';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GrowlContainer,
        MenubarContainer,
        RouterLinkStubDirective,
        RouterOutletStubComponent,
      ],
      imports: [
        GrowlModule,
        MenubarModule,
        StoreModule.provideStore(reducer),
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
