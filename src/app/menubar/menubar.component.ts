import { Component, Input } from '@angular/core';
import { MenuEntry } from './menubar.models';

@Component({
  selector: 'app-menubar-component',
  template: `
    <mat-toolbar color="primary">
      <span class="menu-title">Data Browser</span>
      <span class="menu-spacer"></span>
      <ng-container *ngFor="let item of items">
        <ng-container *ngIf="item.children?.length; else simpleItem">
          <button
            mat-button
            [matMenuTriggerFor]="childMenu"
            [disabled]="item.disabled">
            <mat-icon *ngIf="item.icon" aria-hidden="true">{{ item.icon }}</mat-icon>
            {{ item.label }}
          </button>
          <mat-menu #childMenu="matMenu">
            <button
              mat-menu-item
              *ngFor="let child of item.children"
              [routerLink]="child.routerLink"
              [attr.href]="child.url || null"
              [disabled]="child.disabled">
              <mat-icon *ngIf="child.icon" aria-hidden="true">{{ child.icon }}</mat-icon>
              <span>{{ child.label }}</span>
            </button>
          </mat-menu>
        </ng-container>
        <ng-template #simpleItem>
          <button
            mat-button
            [routerLink]="item.routerLink"
            [attr.href]="item.url || null"
            [disabled]="item.disabled">
            <mat-icon *ngIf="item.icon" aria-hidden="true">{{ item.icon }}</mat-icon>
            {{ item.label }}
          </button>
        </ng-template>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .menu-spacer { flex: 1 1 auto; }
    .menu-title { font-weight: 600; letter-spacing: 0.5px; }
  `]
})
export class MenubarComponent {
  @Input() items: MenuEntry[] = [];
}
