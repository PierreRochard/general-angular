import { Component, Input } from '@angular/core';
import { MenuEntry } from './menubar.models';

@Component({
    selector: 'app-menubar-component',
    template: `
    <mat-toolbar color="primary">
      <span class="menu-title">Data Browser</span>
      <span class="menu-spacer"></span>
      @for (item of items; track item) {
        @if (item.children?.length) {
          <button
            mat-button
            [matMenuTriggerFor]="childMenu"
            [disabled]="item.disabled">
            @if (item.icon) {
              <mat-icon aria-hidden="true">{{ item.icon }}</mat-icon>
            }
            {{ item.label }}
          </button>
          <mat-menu #childMenu="matMenu">
            @for (child of item.children; track child) {
              <button
                mat-menu-item
                [routerLink]="child.routerLink"
                [attr.href]="child.url || null"
                [disabled]="child.disabled">
                @if (child.icon) {
                  <mat-icon aria-hidden="true">{{ child.icon }}</mat-icon>
                }
                <span>{{ child.label }}</span>
              </button>
            }
          </mat-menu>
        } @else {
          <button
            mat-button
            [routerLink]="item.routerLink"
            [attr.href]="item.url || null"
            [disabled]="item.disabled">
            @if (item.icon) {
              <mat-icon aria-hidden="true">{{ item.icon }}</mat-icon>
            }
            {{ item.label }}
          </button>
        }
      }
    </mat-toolbar>
    `,
    styles: [`
    .menu-spacer { flex: 1 1 auto; }
    .menu-title { font-weight: 600; letter-spacing: 0.5px; }
  `],
    standalone: false
})
export class MenubarComponent {
  @Input() items: MenuEntry[] = [];
}
