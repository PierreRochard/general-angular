import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormArray} from '@angular/forms';

import {FormFieldSetting} from './form.models';


@Component({
  selector: 'app-form-component',
  template: `
    <form (ngSubmit)="onSubmit.emit(form.value)" #form="ngForm">
      <div class="ui-g">
        <div class="ui-g-4">
          <app-dynamic-form-element
            *ngFor="let formFieldSetting of formFieldSettings"
            [formFieldName]="formFieldSetting.form_field_name"
            [formArray]="formArray"

          >
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
  @Input() formFieldSettings: FormFieldSetting[];
  @Input() formArray: FormArray;
  @Output() onSubmit = new EventEmitter<any>();
}
