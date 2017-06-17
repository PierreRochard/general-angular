import { Component, Input } from '@angular/core';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `
    <div [formGroup]="formArray">
      <label [attr.for]="formFieldName">
        {{formFieldLabel}}
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
  @Input() formArray: FormArray;
}
