import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EndpointProperty} from "../models/endpoint.model";


@Injectable()
export class FormCreationService {
  constructor() { }

  toFormGroup(formElements:EndpointProperty[] ) {
    let group: any = {};

    formElements.forEach(endpointProperty => {
      group[endpointProperty.name] = endpointProperty.required ?
        new FormControl(endpointProperty.name || '', Validators.required) :
        new FormControl(endpointProperty.name || '');
    });
    return new FormGroup(group);
  }
}
