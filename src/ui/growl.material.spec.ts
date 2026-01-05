import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { GrowlComponent, GrowlMessage } from '../app/growl/growl.component';

describe('GrowlComponent (Material)', () => {
  let fixture: ComponentFixture<GrowlComponent>;
  let component: GrowlComponent;

  const messages: GrowlMessage[] = [
    { severity: 'success', summary: 'Saved', detail: 'Record persisted' },
    { severity: 'error', summary: 'Error', detail: 'Something went wrong' },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GrowlComponent],
      imports: [MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowlComponent);
    component = fixture.componentInstance;
    component.messages = messages;
    fixture.detectChanges();
  });

  it('renders all growl cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Saved');
    expect(cards[1].textContent).toContain('Error');
  });
});
