import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';
import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

import {RpcFormCreationService} from "./rpc-form-creation.service";
import {Path, Property} from "../schema/schema.models";


@Component({
  selector: 'rpc-form',
  template: `
<h1>
  {{selectedPathName}} - RPC Path
</h1>
<div class="ui-g">
  <form [formGroup]="form" (ngSubmit)="submit.emit(form.value)">
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
export class RpcFormComponent implements OnChanges {
  public form: FormGroup;
  public selectedPathPostBodyPropertyNames: string[];

  @Input() selectedPathName:string;
  @Input() selectedPath:Path;
  @Input() selectedPathPostBodyProperties:{[name: string]: Property[]; };
  @Input() selectedPathPostBodyRequiredPropertyNames:string[];
  @Output() submit = new EventEmitter<any>();

  constructor(private form_creation: RpcFormCreationService) {
  }

  ngOnChanges() {
    this.selectedPathPostBodyPropertyNames = Object.keys(this.selectedPathPostBodyProperties);
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
                                               this.selectedPathPostBodyRequiredPropertyNames);
  }



}
