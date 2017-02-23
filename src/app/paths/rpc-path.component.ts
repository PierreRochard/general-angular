import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

import '@ngrx/core/add/operator/select';
import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';

import * as schema from '../schema/schema.actions';

import {FormCreationService} from "./form-creation.service";
import {Path, Property} from "../schema/schema.model";


@Component({
  selector: 'rpc-path',
  template: `
<h1>
  {{selectedPathName}} - RPC Path
</h1>
<div class="ui-g">
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="ui-g-12" *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames">
      <dynamic-form-element [formElement]="form[pathPropertyName]" [form]="form"></dynamic-form-element>
    </div>
    <div class="ui-g-12">
      <button type="submit" label="{{selectedPathName}}" pButton ></button>
    </div>
  </form>
  {{payload}}
</div>
`
})
export class RpcPathComponent implements OnInit {
  public form: FormGroup;
  public payload: string;
  public returnUrl: string;
  public selectedPathPostBodyPropertyNames: string[];

  @Input() selectedPathName:string;
  @Input() selectedPath:Path;
  @Input() selectedPathPostBodyProperties:{[name: string]: Property[]; };
  @Input() selectedPathPostBodyRequiredPropertyNames:string[];

  constructor(private store: Store<fromRoot.State>,
              private router: Router,
              private route: ActivatedRoute,
              private form_creation: FormCreationService) {
    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    this.selectedPathPostBodyPropertyNames = Object.keys(this.selectedPathPostBodyProperties);
  }

  ngOnInit() {
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
    this.selectedPathPostBodyRequiredPropertyNames);
  }

  public onSubmit() {
    let action_payload = {};
    action_payload['properties'] = this.form.value;
    action_payload['path'] = this.selectedPath;
    this.store.dispatch(new schema.SubmitFormAction(action_payload));
    this.router.navigate([this.returnUrl]);
  }

}
