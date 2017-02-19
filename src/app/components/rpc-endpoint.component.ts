import '@ngrx/core/add/operator/select';

import {Component, Input, OnChanges} from '@angular/core';
import {Endpoint, EndpointProperty} from "../models/endpoint.model";
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import {RestClient} from "angular2-postgrest/dist";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'rpc-endpoint',
  template: `
                <h1>RPC {{selectedEndpoint.name}} Endpoint</h1>
                
                <p>
                {{selectedEndpointProperties | json}}
</p>
    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)" class="form-horizontal">
      <div *ngFor="let property of selectedEndpointProperties">
      {{property | json}}
</div>
      <label for="inputEmail3">
        Email
      </label>
      <input [formControl]="form.controls.email" type="email" id="inputEmail3" placeholder="Email">
      
      <label for="inputPassword3">
        Password
      </label>
      <input [formControl]="form.controls.password" type="password" id="inputPassword3" placeholder="Password">
      
      <button type="submit">Sign in</button>
    </form>
                `
})
export class RpcEndpointComponent implements OnChanges {
  public form: FormGroup;

  @Input() selectedEndpoint:Endpoint;
  @Input() selectedEndpointProperties:EndpointProperty[];

  constructor(private form_builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private http: RestClient ) {

  }

  ngOnChanges() {
    this.selectedEndpointProperties.map(property => {
      this.form.addControl(property.name, new FormControl('', Validators.required))
    });
  }

}
