import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';

import {FormCreationService} from './form-creation.service';


@Component({
  selector: 'form-component',
  template: `<form [formGroup]="form" (ngSubmit)="onSubmit.emit(form.value)">
              <div class="ui-g">
                <div class="ui-g-4">
                  <dynamic-form-element  
                        *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames"
                        [formElementName]="pathPropertyName" 
                        [form]="form">
                   </dynamic-form-element>
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

  @Input() schemaState;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private formCreation: FormCreationService) { }

  ngOnChanges() {
    // this.form = this.formCreation.toFormGroup();
  }

  get selectedPathName(): string {
    return this.schemaState.selectedPathName;
  }

}
