import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SnackbarService, UserService } from '../../../services';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  readonly form = new FormGroup({
    name: new FormControl('', []),
    tel: new FormControl('', []),
    email: new FormControl('', []),
    password: new FormControl('', []),
  });

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService,
    private readonly _userService: UserService
  ) {}

  get name() {
    return this.form.get('name') as FormControl;
  }
  get tel() {
    return this.form.get('tel') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }

  ngOnInit() {
    if (this._userService.token) {
      this._router.navigate(['/']).then();
      this._snackbarService.open('You are already registered!');
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      this._subscription.add(
        this._userService.create(this.form.value).subscribe({
          next: () => {
            this._router.navigate(['/login']).then();
            this._snackbarService.open('You have successfully registered!');
          },
          error: (error) => {
            console.error(error.message);
            this._snackbarService.open('The user already exists!');
          },
          complete: () => {
            this.form.enable();
          },
        })
      );
    }
  }
}
