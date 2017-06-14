import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormArray} from '@angular/forms';


@Component({
  selector: 'app-form-component',
  template: `
    <form (ngSubmit)="onSubmit.emit(form.value)">
      <div class="ui-g">
        <div class="ui-g-4">
          <app-dynamic-form-element
            *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames"
            [formElementName]="pathPropertyName"
            [formArray]="formArray">
          </app-dynamic-form-element>
        </div>
      </div>
      <div class="ui-g">
        <div class="ui-g-12">
          <button type="submit" [label]="selectedPathName" pButton></button>
        </div>
      </div>
    </form>`
})
export class FormComponent {
  @Input() selectedPathName: string;
  @Input() formArray: FormArray;
  @Output() onSubmit = new EventEmitter<any>();
}
