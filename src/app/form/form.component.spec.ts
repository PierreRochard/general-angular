import { CommonModule } from '@angular/common';
import { render, screen, fireEvent } from '@testing-library/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormElementComponent } from './form-element.component';

const formSettings = {
  custom_name: 'Login',
} as any;

const formFieldSettings = [
  { field_name: 'email', custom_name: 'Email', field_type: 'email' },
  { field_name: 'password', custom_name: 'Password', field_type: 'password' },
] as any[];

describe('FormComponent (validation)', () => {
  it('shows required errors when submitted empty and emits when valid', async () => {
    const { fixture } = await render(FormComponent, {
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [FormElementComponent],
      componentProperties: {
        formSettings,
        formFieldSettings,
      },
    });

    const emitSpy = spyOn(fixture.componentInstance.onSubmit, 'emit');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errors = await screen.findAllByText(/is required/i);
    expect(errors.length).toBe(2);
    expect(emitSpy).not.toHaveBeenCalled();

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'supersecret' } });

    fireEvent.click(submitButton);

    expect(emitSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'supersecret',
    });
  });
});
