import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `<div [formGroup]="form">
              <label [attr.for]="formElementName">{{formElementLabel}}</label>
                <input *ngIf="!(formElementName === 'password')"
                        [formControlName]="formElementName"
                        [id]="formElementName"
                        pInputText />
                <input *ngIf="formElementName === 'password'"
                        type="password"
                        [formControlName]="formElementName"
                        pPassword />
            </div>`,
  styles: [`
            .ui-inputtext {
                display:block;
            }
          `]
})
export class FormElementComponent {
  @Input() formElementName: string;
  @Input() form: FormGroup;
  get formElementLabel(): string {
    const label = this.formElementName.replace('_', ' ');
    if (label === 'id') {
      return label.toUpperCase();
    } else {
      return label.charAt(0).toUpperCase() + label.slice(1);
    }
  }
}
