import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';

import { MenubarComponent } from '../app/menubar/menubar.component';
import { MenuEntry } from '../app/menubar/menubar.models';

describe('MenubarComponent (Material)', () => {
  let fixture: ComponentFixture<MenubarComponent>;
  let component: MenubarComponent;

  const items: MenuEntry[] = [
    { label: 'Home', icon: 'home', routerLink: '/' },
    {
      label: 'Tables',
      icon: 'table_chart',
      children: [
        { label: 'Accounts', routerLink: ['/chart_of_accounts/accounts'] },
        { label: 'Transactions', routerLink: ['/banking/transactions'] },
      ],
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenubarComponent],
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('renders a toolbar with the menu title', () => {
    const toolbar: HTMLElement = fixture.nativeElement.querySelector('mat-toolbar');
    expect(toolbar).toBeTruthy();
    expect(toolbar.textContent).toContain('Data Browser');
  });

  it('renders top-level items as buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const labels = Array.from(buttons as NodeListOf<HTMLButtonElement>).map(b => b.textContent?.trim() || '');
    expect(labels.some(text => text.includes('Home'))).toBe(true);
    expect(labels.some(text => text.includes('Tables'))).toBe(true);
  });

  it('attaches a menu trigger for nested items', () => {
    const triggers = fixture.debugElement.queryAll(By.directive(MatMenuTrigger));
    expect(triggers.length).toBe(1);
  });
});
