import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormContainer } from './form.container';
import { FormComponent } from './form.component';
import { FormElementComponent } from './form-element.component';
import { FormService } from './form.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormComponent,
    FormContainer,
    FormElementComponent,
  ],
  providers: [
    FormService,
  ],
  exports: [
    FormContainer,
  ]
})
export class AppFormModule { }
