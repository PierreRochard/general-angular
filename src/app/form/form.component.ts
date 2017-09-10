import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {FormField} from './form.models';


@Component({
  selector: 'app-form-component',
  template: `
    <form
      *ngIf="formFieldSettings !== null && formSettings !== null"
      [formGroup]="form"
      (ngSubmit)="onSubmit.emit(form.value)">
      <div class="ui-g">
        <div class="ui-sm-0 ui-md-1 ui-lg-3 ui-xl-4"></div>
        <div class="ui-sm-12 ui-md-10 ui-lg-6 ui-xl-4">
          <p-fieldset [legend]="formSettings.customName">
            <div class="ui-g">
              <div class="ui-g-12">
                <app-dynamic-form-element
                  *ngFor="let formFieldSetting of formFieldSettings"
                  [formFieldName]="formFieldSetting.fieldName"
                  [formFieldLabel]="formFieldSetting.customName"
                  [formGroup]="form"
                >
                </app-dynamic-form-element>
              </div>
            </div>
            <div class="ui-g">
              <div class="ui-sm-0 ui-md-1 ui-lg-3 ui-xl-4"></div>
              <div class="ui-sm-12 ui-md-10 ui-lg-6 ui-xl-4">
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
  @Input() formFieldSettings: FormField[];
  @Output() onSubmit = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges() {
    const group = {};
    this.formFieldSettings.map(settings => {
      group[settings.fieldName] = new FormControl('')
    });
    this.form = this.fb.group(group);
  }
}
