import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

import '@ngrx/core/add/operator/select';
import {Store} from "@ngrx/store";

import * as fromRoot from '../app.reducers';
import {RestClient} from "../common/rest-client.service";

import * as endpoint from '../schema/endpoint.actions';

import {FormCreationService} from "./form-creation.service";
import {Path, Definition, Property} from "../schema/schema.model";


@Component({
  selector: 'rpc-endpoint',
  template: `
<h1>
  {{selectedEndpoint.name}} - RPC Endpoint
</h1>
<div class="ui-g">
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="ui-g-12" *ngFor="let endpointProperty of selectedEndpointProperties">
      <dynamic-form-element [formElement]="endpointProperty" [form]="form"></dynamic-form-element>
    </div>
    <div class="ui-g-12">
      <button type="submit" label="{{selectedEndpoint.name}}" pButton ></button>
    </div>
  </form>
  {{payload}}
</div>
`
})
export class RpcPathComponent implements OnInit {
  public form: FormGroup;
  public payload: string;
  public returnUrl:string;

  @Input() selectedPath:Path;
  @Input() selectedPathPostBodyProperties:Property[];

  constructor(private store: Store<fromRoot.State>,
              private router: Router,
              private route: ActivatedRoute,
              private form_creation: FormCreationService) {
    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  ngOnInit() {
    this.form = this.form_creation.toFormGroup(this.selectedPathPostBodyProperties);
  }

  public onSubmit() {
    let action_payload = {};
    action_payload['properties'] = this.form.value;
    action_payload['path'] = 'rpc/' + this.selectedEndpoint.name;
    this.store.dispatch(new endpoint.SubmitFormAction(action_payload));
    this.router.navigate([this.returnUrl]);
  }

}
