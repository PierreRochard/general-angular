import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormField, Form } from './form.models';

type DynamicFormControls = Record<string, FormControl<string>>;
type DynamicFormGroup = FormGroup<DynamicFormControls>;

@Component({
    selector: 'app-form-component',
    templateUrl: './form.component.html',
    standalone: false
})
export class FormComponent implements OnChanges {
  @Input() formSettings: Form;
  @Input() formFieldSettings: FormField[] = [];
  @Output() onSubmit = new EventEmitter<Record<string, string>>();

  public form: DynamicFormGroup = new FormGroup<DynamicFormControls>({});

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(): void {
    if (!this.formFieldSettings) {
      return;
    }
    const controls = this.formFieldSettings.reduce<DynamicFormControls>((acc, settings) => {
      const validators = [Validators.required];
      if (settings.field_type === 'email') {
        validators.push(Validators.email);
      }
      if (settings.field_type === 'password') {
        validators.push(Validators.minLength(8));
      }
      acc[settings.field_name] = this.fb.nonNullable.control('', {
        validators,
      });
      return acc;
    }, {});
    this.form = new FormGroup<DynamicFormControls>(controls);
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.onSubmit.emit(this.form.getRawValue());
  }
}
