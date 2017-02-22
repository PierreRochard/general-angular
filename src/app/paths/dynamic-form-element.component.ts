import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
  selector: 'dynamic-form-element',
  template: `
<div [formGroup]="form">
  <label [attr.for]="formElement.name">{{formElement.name}}</label>
    <input *ngIf="!(formElement.name === 'password')" 
            [formControlName]="formElement.name" 
            [id]="formElement.name" 
            pInputText />
    <input *ngIf="formElement.name === 'password'" 
            type="password" 
            [formControlName]="formElement.name" 
            pPassword />
</div>
`
})
export class DynamicFormElementComponent {
  @Input() formElement;
  @Input() form: FormGroup;
}
