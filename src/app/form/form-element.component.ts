import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
  selector: 'dynamic-form-element',
  template: `
<div [formGroup]="form">
  <label [attr.for]="formElementName">{{formElementName}}</label>
    <input *ngIf="!(formElementName === 'password')" 
            [formControlName]="formElementName" 
            [id]="formElementName" 
            pInputText />
    <input *ngIf="formElementName === 'password'" 
            type="password" 
            [formControlName]="formElementName" 
            pPassword />
</div>
`
})
export class FormElementComponent {
  @Input() formElementName;
  @Input() form: FormGroup;
}
