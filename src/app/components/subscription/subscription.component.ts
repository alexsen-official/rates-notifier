import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router }                               from '@angular/router';
import { ISubscription }                        from '../../interfaces';

import {
  RateService,
  SnackbarService,
  SubscriptionService,
  UserService
} from '../../services';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  readonly form = this._builder.group({
    fRate: [null, [Validators.required]],
    sRate: [null, [Validators.required]]
  });

  cols: string[] = [];

  constructor(private readonly _builder     : FormBuilder,
              private readonly _router      : Router,
              private readonly _rate        : RateService,
              private readonly _user        : UserService,
              private readonly _subscription: SubscriptionService,
              private readonly _snackbar    : SnackbarService) { }

  get fRate() { return this.form.get('fRate') as FormControl; }
  get sRate() { return this.form.get('sRate') as FormControl; }

  get token() { return this._user.token; }

  ngOnInit() {
    this.form.disable();

    if (this.token) {
      this._rate
          .getByYear(new Date().getFullYear())
          .subscribe({
            next: val => {
              this.form.enable();
              this.cols = Object.keys(val[0]).slice(2, -1);
            },
            error: err => console.error(err)
          });

      this.fRate.valueChanges.subscribe(() => {
        if (this.fRate.value >= this.sRate.value)
          this.sRate.reset();
      });
    }
    else {
      this._router.navigate(['/']).then();
      this._snackbar.open('You must login to subscribe!');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      this._subscription
          .create({
            fRate: this.cols[this.fRate.value],
            sRate: this.cols[this.sRate.value],
            userId: this.token._id
          } as ISubscription)
          .subscribe({
            next: () => {
              this.form.enable();
              this._router.navigate(['/']).then();
              this._snackbar.open('You have successfully subscribed to updates!');
            },
            error: err => {
              this.form.enable();
              this._snackbar.open('Something went wrong! Please try again later!');
              console.error(err);
            }
          });
    }
  }
}
