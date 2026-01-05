import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `
    <mat-form-field appearance="outline" class="form-field" [formGroup]="formGroup">
      <mat-label>{{ formFieldLabel }}</mat-label>
      <input
        *ngIf="formFieldName !== 'password'"
        matInput
        [formControlName]="formFieldName"
        [id]="formFieldName"
        type="text"
      />
      <input
        *ngIf="formFieldName === 'password'"
        matInput
        [formControlName]="formFieldName"
        [id]="formFieldName"
        type="password"
      />
    </mat-form-field>
  `,
  styles: [`
    .form-field {
      width: 100%;
    }
  `]
})
export class FormElementComponent {
  @Input() formFieldName: string;
  @Input() formFieldLabel: string;
  @Input() formGroup: FormGroup;
}
