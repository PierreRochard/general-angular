import { Component, Input } from '@angular/core';

export interface GrowlMessage {
  severity: 'success' | 'info' | 'warn' | 'error' | string;
  summary: string;
  detail?: string;
}

@Component({
    selector: 'app-growl-component',
    template: `
    @if (messages?.length) {
      <div class="growl-list">
        @for (message of messages; track message) {
          <mat-card
            [ngClass]="message.severity">
            <mat-card-title>{{ message.summary }}</mat-card-title>
            <mat-card-content>{{ message.detail }}</mat-card-content>
          </mat-card>
        }
      </div>
    }
    `,
    styles: [`
    .growl-list {
      position: fixed;
      right: 16px;
      bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
    }
    mat-card {
      min-width: 260px;
    }
    .success mat-card-title { color: #1b5e20; }
    .error mat-card-title { color: #c62828; }
    .warn mat-card-title { color: #ff8f00; }
  `],
    standalone: false
})
export class GrowlComponent {
  @Input() messages: GrowlMessage[];
}
