import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

import {FormFieldSetting} from './form.models';


@Component({
  selector: 'app-form-component',
  template: `
    <form [formGroup]="formArray" (ngSubmit)="onSubmit.emit(form.value)">
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
export class FormComponent implements OnInit {
  @Input() selectedPathName: string;
  @Input() formFieldSettings: FormFieldSetting[];
  @Output() onSubmit = new EventEmitter<any>();

  public formArray: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    const controls = this.formFieldSettings.map(settings => {
        return new FormControl(settings.form_field_name)
      }
    );
    this.formArray = this.fb.array(controls)
  }
}
