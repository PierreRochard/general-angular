import {Component, Input, EventEmitter, Output, OnChanges} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {FormGroup} from "@angular/forms";
import {FormCreationService} from "../form/form-creation.service";
import {Property} from "../schema/schema.models";

@Component({
  selector: 'apiurl-component',
  template: `<div *ngIf="!!!apiUrl">
              <form [formGroup]="form" (ngSubmit)="onSubmit.emit(form.value)">
                <div class="ui-g">
                  <div class="ui-g-12">
                    <dynamic-form-element [formElementName]="'API URL'" [form]="form"></dynamic-form-element>
                  </div>
                </div>
                <div class="ui-g">
                  <div class="ui-g-12">
                    <button type="submit" label="Submit" pButton ></button>
                  </div>
                </div>
              </form>
            </div>`
})
export class ApiUrlComponent implements OnChanges {
  public form: FormGroup;

  @Input() apiUrl: string;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private form_creation: FormCreationService) {}
  ngOnChanges() {
    let property_attributes: Property = {'format': 'name', 'type': 'string'};
    let property = {'API URL': [property_attributes, ]};
    this.form = this.form_creation.toFormGroup(property, ['apiUrl']);
  }
}
