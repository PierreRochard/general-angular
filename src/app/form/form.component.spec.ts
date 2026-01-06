import { CommonModule } from '@angular/common';
import { render, screen, fireEvent } from '@testing-library/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

    fixture.componentInstance.submitForm();
    fixture.detectChanges();

    const errors = await screen.findAllByText(/is required/i);
    expect(errors.length).toBe(2);
    expect(emitSpy).not.toHaveBeenCalled();

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'supersecret' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(emitSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'supersecret',
    });
  });

  it('shows distinct errors per field after touch', async () => {
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

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fixture.componentInstance.submitForm();
    fixture.detectChanges();

    expect(await screen.findAllByText(/is required/i)).toHaveSize(2);

    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'wrong' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.click(submitButton);
    const errors = await screen.findAllByText(/is required/i);
    expect(errors.length).toBeGreaterThanOrEqual(1);

    expect(fixture.componentInstance.form.invalid).toBeTrue();
  });

  it('disables submit until form is valid and preserves special characters', async () => {
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
    const submitButton = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
    expect(submitButton.disabled).toBeTrue();

    const specialEmail = 'user+test@example.com';
    const specialPassword = 'P@ssw0rd🚀!';
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: specialEmail } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: specialPassword } });

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
    fireEvent.click(submitButton);

    expect(emitSpy).toHaveBeenCalledWith({
      email: specialEmail,
      password: specialPassword,
    });
  });

  it('rebuilds controls on settings change without leaking previous values', async () => {
    const component = new FormComponent(new FormBuilder());
    component.formFieldSettings = formFieldSettings;
    component.ngOnChanges();
    component.form.get('email')?.setValue('first@example.com');

    component.formFieldSettings = [
      { field_name: 'username', custom_name: 'Username', field_type: 'text' } as any,
    ];
    component.ngOnChanges();

    expect(component.form.contains('username')).toBeTrue();
    expect(component.form.contains('email')).toBeFalse();
    const usernameControl = component.form.get('username');
    expect(usernameControl?.value).toBe('');
  });
});
