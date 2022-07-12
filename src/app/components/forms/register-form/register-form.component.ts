import { Component, OnInit }            from '@angular/core';
import { FormBuilder, FormControl }     from '@angular/forms';
import { Router }                       from '@angular/router';
import { SnackbarService, UserService } from '../../../services';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  readonly form = this._builder.group({
    name    : [null, []],
    tel     : [null, []],
    email   : [null, []],
    password: [null, []]
  });

  constructor(private readonly _builder   : FormBuilder,
              private readonly _router    : Router,
              private readonly _snackbar  : SnackbarService,
              private readonly _user      : UserService) { }

  get name()     { return this.form.get('name')     as FormControl; }
  get tel()      { return this.form.get('tel')      as FormControl; }
  get email()    { return this.form.get('email')    as FormControl; }
  get password() { return this.form.get('password') as FormControl; }

  ngOnInit() {
    if (this._user.token) {
      this._router.navigate(['/']).then();
      this._snackbar.open('You are already registered!');
    }
  }

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
}
