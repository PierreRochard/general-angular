import {Component, Input} from '@angular/core';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-element',
  template: `<div>
              <label [attr.for]="formElementName">{{formElementLabel}}</label>
                <input *ngIf="!(formElementName === 'password')"
                        [id]="formElementName"
                        pInputText />
                <input *ngIf="formElementName === 'password'"
                        type="password"
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
  @Input() formArray: FormArray;
  get formElementLabel(): string {
    const label = this.formElementName.replace('_', ' ');
    if (label === 'id') {
      return label.toUpperCase();
    } else {
      return label.charAt(0).toUpperCase() + label.slice(1);
    }
  }
}
