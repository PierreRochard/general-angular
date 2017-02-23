import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {Parameter, Property} from "../schema/schema.model";


@Injectable()
export class FormCreationService {
  constructor() { }

  toFormGroup(properties:Property[], required_properties:string[]) {
    let group: any = {};

    Object.keys(properties).forEach(property_name => {

      group[property_name] = required_properties.includes(property_name) ?
        new FormControl('', Validators.required) :
        new FormControl('');
    });
    return new FormGroup(group);
  }
}
