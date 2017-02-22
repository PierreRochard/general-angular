import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {Parameter, Property} from "../schema/schema.model";


@Injectable()
export class FormCreationService {
  constructor() { }

  toFormGroup(parameters:Property[] ) {
    let group: any = {};

    parameters.forEach(property => {
      group[property.name] = property.required ?
        new FormControl('', Validators.required) :
        new FormControl('');
    });
    return new FormGroup(group);
  }
}
