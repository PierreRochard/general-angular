import { Component, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `
    <div [formGroup]="formGroup">
      <label>
        {{formFieldName}}
      </label>

        <input *ngIf="formFieldName !== 'password'"
                [formControlName]="formFieldName"
                [id]="formFieldName"
                pInputText
        />

        <input *ngIf="formFieldName === 'password'"
               [formControlName]="formFieldName"
               [id]="formFieldName"
               type="password"
               pPassword
        />

    </div>
  `
})
export class FormElementComponent {
  @Input() formFieldName: string;
  @Input() formFieldLabel: string;
  @Input() formGroup: FormGroup;
}
