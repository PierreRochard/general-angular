import {Injectable}   from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Property} from "../schema/schema.models";


@Injectable()
export class FormCreationService {
  toFormGroup(properties:{[name: string]: Property[]; }, required_properties:string[]) {
    let group: any = {};
    Object.keys(properties).forEach(property_name => {
      group[property_name] = required_properties.includes(property_name) ?
        new FormControl('', Validators.required) :
        new FormControl('');
    });
    return new FormGroup(group);
  }
}
