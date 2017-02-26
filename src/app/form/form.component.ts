import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';

import {FormCreationService} from "./form-creation.service";
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'form',
  template: `
<div class="ui-g">
  <form [formGroup]="form" (ngSubmit)="onSubmit.emit(form.value)">
    <div class="ui-g-12" *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames">
      <dynamic-form-element [formElementName]="pathPropertyName" [form]="form"></dynamic-form-element>
    </div>
    <div class="ui-g-12">
      <button type="submit" label="{{selectedPathName}}" pButton ></button>
    </div>
  </form>
</div>
`
})
export class FormComponent implements OnChanges {
  public form: FormGroup;
  public selectedPathPostBodyPropertyNames: string[];

  @Input() selectedPathName:string;
  @Input() selectedPath:Path;
  @Input() selectedPathPostBodyProperties:{[name: string]: Property[]; };
  @Input() selectedPathPostBodyRequiredPropertyNames:string[];
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private form_creation: FormCreationService) {
  }

  ngOnChanges() {
    this.selectedPathPostBodyPropertyNames = Object.keys(this.selectedPathPostBodyProperties);
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
                                               this.selectedPathPostBodyRequiredPropertyNames);
  }



}
