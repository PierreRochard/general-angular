import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {FormFieldSetting} from './form.models';


@Component({
  selector: 'app-form-component',
  template: `
    <form
      *ngIf="formFieldSettings.length > 0"
      [formGroup]="form"
      (ngSubmit)="onSubmit.emit(form.value)">
      <div class="ui-g">
        <div class="ui-g-4"></div>
        <div class="ui-g-4">
          <p-fieldset [legend]="formSettings.custom_name">
          <div class="ui-g">
            <div class="ui-g-12">
              <app-dynamic-form-element
                *ngFor="let formFieldSetting of formFieldSettings"
                [formFieldName]="formFieldSetting.form_field_name"
                [formFieldLabel]="formFieldSetting.form_field_label"
                [formGroup]="form"
              >
              </app-dynamic-form-element>
            </div>
          </div>
          <div class="ui-g">
            <div class="ui-g-4"></div>
            <div class="ui-g-4">
              <button type="submit"
                      [label]="'Submit'"
                      pButton>
              </button>
            </div>
            <div class="ui-g-4"></div>
          </div>
          </p-fieldset>
        </div>
      </div>
    </form>`,
})
export class FormComponent implements OnChanges {
  @Input() selectedPathName: string;
  @Input() formSettings: any;
  @Input() formFieldSettings: FormFieldSetting[];
  @Output() onSubmit = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges() {
    const group = {};
    this.formFieldSettings.map(settings => {
      group[settings.form_field_name] = new FormControl('')
    });
    this.form = this.fb.group(group);
  }
}
