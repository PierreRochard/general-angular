import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PasswordModule } from 'primeng/components/password/password';
import { ButtonModule } from 'primeng/components/button/button';

import { FormContainer } from './form.container';
import { FormComponent } from './form.component';
import { FormElementComponent } from './form-element.component';
import { FormCreationService } from './form-creation.service';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
  ],
  declarations: [
    FormComponent,
    FormContainer,
    FormElementComponent,
  ],
  providers: [
    FormCreationService,
  ],
  exports: [
    FormContainer,
  ]
})
export class AppFormModule { }
