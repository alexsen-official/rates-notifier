import { Component, OnInit }            from '@angular/core';
import { FormBuilder, FormControl }     from '@angular/forms';
import { Router }                       from '@angular/router';
import { SnackbarService, UserService } from '../../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  readonly form = this._builder.group({
    email   : [null, []],
    password: [null, []]
  });

  constructor(private readonly _builder : FormBuilder,
              private readonly _router  : Router,
              private readonly _snackbar: SnackbarService,
              private readonly _user    : UserService) { }

  get email()    { return this.form.get('email')    as FormControl; }
  get password() { return this.form.get('password') as FormControl; }

  ngOnInit() {
    if (this._user.token) {
      this._router.navigate(['/']).then();
      this._snackbar.open('You are already logged in!');
    }
  }

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
}
