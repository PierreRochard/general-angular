import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';

import {FormCreationService} from "./form-creation.service";
import {Path, Property} from "../schema/schema.models";
import {SchemaState} from "../schema/schema.reducers";


@Component({
  selector: 'form-component',
  template: `<form [formGroup]="form" (ngSubmit)="onSubmit.emit(form.value)">
              <div class="ui-g">
                <div class="ui-g-4" *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames">
                  <dynamic-form-element [formElementName]="pathPropertyName" [form]="form"></dynamic-form-element>
                </div>
              </div>
              <div class="ui-g">
                <div class="ui-g-12">
                  <button type="submit" [label]="selectedPathName" pButton ></button>
                </div>
              </div>
            </form>`
})
export class FormComponent implements OnChanges {
  public form: FormGroup;

  @Input() schemaState:SchemaState;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private form_creation: FormCreationService) { }

  ngOnChanges() {
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
                                               this.selectedPathPostBodyRequiredPropertyNames);
  }

  get selectedPathName(): string {
    return this.schemaState.selectedPathName;
  }

  get selectedPathPostBodyProperties(): {[name: string]: Property[]; } {
    return this.schemaState.selectedPathPostBodyProperties;
  }
  get selectedPathPostBodyPropertyNames(): string[] {
    return Object.keys(this.schemaState.selectedPathPostBodyProperties);
  }

  get selectedPathPostBodyRequiredPropertyNames(): string[] {
    return this.schemaState.selectedPathPostBodyRequiredPropertyNames;
  }

}
