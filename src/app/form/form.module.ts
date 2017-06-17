import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PasswordModule } from 'primeng/components/password/password';
import { ButtonModule } from 'primeng/components/button/button';

import { FormContainer } from './form.container';
import { FormComponent } from './form.component';
import { FormElementComponent } from './form-element.component';
import { FormCreationService } from './form-creation.service';
import { FormService } from './form.service';
import { FormGuard } from './form.guard';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormComponent,
    FormContainer,
    FormElementComponent,
  ],
  providers: [
    FormGuard,
    FormService,
    FormCreationService,
  ],
  exports: [
    FormContainer,
  ]
})
export class AppFormModule { }
