import {Component, Input} from '@angular/core';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `
    <div>
      <label for="formFieldName">
        {{formFieldLabel}}
      </label>

        <input *ngIf="formFieldName !== 'password'"
                [id]="formFieldName"
                pInputText
        />

        <input *ngIf="formFieldName === 'password'"
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
