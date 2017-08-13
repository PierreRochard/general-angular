import { Component, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `
    <div class="ui-g" [formGroup]="formGroup">
      <div class="ui-g-6">
        <label>
          {{formFieldName}}
        </label>
      </div>
      <div class="ui-g-6">
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
    </div>
  `
})
export class FormElementComponent {
  @Input() formFieldName: string;
  @Input() formFieldLabel: string;
  @Input() formGroup: FormGroup;
}
