import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SnackbarService, UserService } from '../../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  readonly form = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
  });

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService,
    private readonly _userService: UserService
  ) {}

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }

  ngOnInit() {
    if (this._userService.token) {
      this._router.navigate(['/']).then();
      this._snackbarService.open('You are already logged in!');
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      this._subscription.add(
        this._userService.login(this.form.value).subscribe({
          next: () => {
            this._router.navigate(['/']).then();
            this._snackbarService.open('You have successfully logged in!');
          },
          error: (error) => {
            console.error(error.message);
            this._snackbarService.open('Invalid email or password!');
          },
          complete: () => {
            this.form.enable();
          },
        })
      );
    }
  }
}
