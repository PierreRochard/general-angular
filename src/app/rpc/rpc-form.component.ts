import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';
import {Store} from "@ngrx/store";
import {go} from "@ngrx/router-store";

import * as fromRoot from '../app.reducers';

import * as schema from '../schema/schema.actions';

import {RpcFormCreationService} from "./rpc-form-creation.service";
import {Path, Property} from "../schema/schema.model";


@Component({
  selector: 'rpc-form',
  template: `
<h1>
  {{selectedPathName}} - RPC Path
</h1>
<div class="ui-g">
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="ui-g-12" *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames">
      <dynamic-form-element [formElementName]="pathPropertyName" [form]="form"></dynamic-form-element>
    </div>
    <div class="ui-g-12">
      <button type="submit" label="{{selectedPathName}}" pButton ></button>
    </div>
  </form>
  {{payload}}
</div>
`
})
export class RpcFormComponent implements OnInit {
  public form: FormGroup;
  public payload: string;
  public selectedPathPostBodyPropertyNames: string[];

  @Input() selectedPathName:string;
  @Input() selectedPath:Path;
  @Input() selectedPathPostBodyProperties:{[name: string]: Property[]; };
  @Input() selectedPathPostBodyRequiredPropertyNames:string[];

  constructor(private store: Store<fromRoot.State>,
              private form_creation: RpcFormCreationService) {
  }

  ngOnInit() {
    this.selectedPathPostBodyPropertyNames = Object.keys(this.selectedPathPostBodyProperties);
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
                                               this.selectedPathPostBodyRequiredPropertyNames);
  }

  public onSubmit() {
    let action_payload = {
      properties: this.form.value,
      path: this.selectedPathName,
    };
    this.store.dispatch(new schema.SubmitFormAction(action_payload));
    this.store.dispatch(go(['/']));
  }

}
