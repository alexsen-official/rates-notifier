import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  SnackbarService,
  UserService,
  ValidationService
} from '../../services';

import {
  hasLowercaseValidator,
  hasNumericValidator,
  hasUppercaseValidator,
  lettersOnlyValidator,
  numericOnlyValidator
} from '../../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  readonly maxNameLength = 128;

  readonly form = this._formBuilder.group({
    name: [null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(this.maxNameLength),
      lettersOnlyValidator()
    ]],

    tel: [null, [
      Validators.minLength(7),
      Validators.maxLength(15),
      numericOnlyValidator()
    ]],

    email: [null, [
      Validators.required,
      Validators.email
    ]],

    password: [null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      hasUppercaseValidator(),
      hasLowercaseValidator(),
      hasNumericValidator()
    ]]
  });

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router     : Router,
              private readonly _snackbar   : SnackbarService,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService) { }

  get name()     { return this.form.get('name')     as FormControl; }
  get tel()      { return this.form.get('tel')      as FormControl; }
  get email()    { return this.form.get('email')    as FormControl; }
  get password() { return this.form.get('password') as FormControl; }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      this._user
          .create(this.form.value)
          .subscribe({
            next: () => {
              this.form.enable();
              this._router.navigate(['/login']).then();
              this._snackbar.open('You have successfully registered!');
            },
            error: err => {
              this.form.enable();
              this._snackbar.open('The user already exists!');
              console.error(err);
            }
          });
    }
  }

  getError = (control: FormControl, label: string) =>
    this._validation.getError(control, label);
}