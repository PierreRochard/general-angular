import { Component, EventEmitter, Input, Output } from '@angular/core';
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
                (keyup)="submitData($event)"
                pInputText
        />

        <input *ngIf="formFieldName === 'password'"
               [id]="formFieldName"
               (keyup)="submitData($event)"
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
  @Output() submitData = new EventEmitter<any>();
}
