import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FormField, Form } from './form.models';


@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnChanges {
  @Input() formSettings: Form;
  @Input() formFieldSettings: FormField[];
  @Output() onSubmit = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(): void {
    const group: { [key: string]: any } = {};
    this.formFieldSettings.map(settings => {
      group[settings.field_name] = new FormControl('')
    });
    this.form = this.fb.group(group);
  }
}
