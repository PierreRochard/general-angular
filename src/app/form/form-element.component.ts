import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form-element',
    template: `
    <mat-form-field appearance="outline" class="form-field" [formGroup]="formGroup">
      <mat-label>{{ formFieldLabel }}</mat-label>
      @if (resolvedType !== 'password') {
        <input
          matInput
          [formControlName]="formFieldName"
          [id]="formFieldName"
          [type]="resolvedType"
          />
      }
      @if (resolvedType === 'password') {
        <input
          matInput
          [formControlName]="formFieldName"
          [id]="formFieldName"
          type="password"
          />
      }
      @if (formGroup.get(formFieldName)?.hasError('required') && formGroup.get(formFieldName)?.touched) {
        <mat-error>
          {{ formFieldLabel }} is required
        </mat-error>
      }
    </mat-form-field>
    `,
    styles: [`
    .form-field {
      width: 100%;
    }
  `],
    standalone: false
})
export class FormElementComponent {
  @Input() formFieldName: string;
  @Input() formFieldLabel: string;
  @Input() formFieldType?: string;
  @Input() formGroup: FormGroup;

  get resolvedType(): string {
    if (this.formFieldType === 'password' || this.formFieldName === 'password') {
      return 'password';
    }
    if (this.formFieldType === 'email') {
      return 'email';
    }
    return 'text';
  }
}
