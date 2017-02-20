import '@ngrx/core/add/operator/select';

import {Component, Input, OnInit} from '@angular/core';
import {Endpoint, EndpointProperty} from "../models/endpoint.model";
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import {RestClient} from "angular2-postgrest/dist";
import {ActivatedRoute, Router} from "@angular/router";
import {FormCreationService} from "../services/form-creation.service";


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
export class RpcEndpointComponent implements OnInit {
  public form: FormGroup;
  public payload: string;
  @Input() selectedEndpoint:Endpoint;
  @Input() selectedEndpointProperties:EndpointProperty[];

  constructor(private form_builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private http: RestClient,
              private form_creation: FormCreationService) {

  }

  ngOnInit() {
    this.form = this.form_creation.toFormGroup(this.selectedEndpointProperties);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.value);
  }

}
