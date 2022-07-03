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
  hasUppercaseValidator
} from '../../validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly form = this._formBuilder.group({
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

  get email()    { return this.form.get('email')    as FormControl; }
  get password() { return this.form.get('password') as FormControl; }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      this._user
          .login(this.form.value)
          .subscribe({
            next: () => {
              this.form.enable();
              this._router.navigate(['/']).then();
              this._snackbar.open('You have successfully logged in!');
            },
            error: err => {
              this.form.enable();
              this._snackbar.open('Invalid email or password!');
              console.error(err);
            }
          });
    }
  }

  getError = (control: FormControl, label: string) =>
    this._validation.getError(control, label);
}
