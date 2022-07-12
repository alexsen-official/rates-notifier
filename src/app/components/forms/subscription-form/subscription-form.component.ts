import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router }                               from '@angular/router';
import { ISubscription }                        from '../../../interfaces';

import {
  RateService,
  SnackbarService,
  SubscriptionService,
  UserService
} from '../../../services';

import { numericOnlyValidator } from '../../../validators';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  readonly form = this._builder.group({
    fRate: [null, [Validators.required]],
    sRate: [null, [Validators.required]],

    hours: [10, [
      Validators.min(0),
      Validators.max(23),
      numericOnlyValidator(),
      Validators.required
    ]],

    minutes: [0, [
      Validators.min(0),
      Validators.max(59),
      numericOnlyValidator(),
      Validators.required
    ]]
  });

  cols: string[] = [];

  constructor(private readonly _builder     : FormBuilder,
              private readonly _router      : Router,
              private readonly _rate        : RateService,
              private readonly _user        : UserService,
              private readonly _subscription: SubscriptionService,
              private readonly _snackbar    : SnackbarService) { }

  get fRate()   { return this.form.get('fRate')   as FormControl; }
  get sRate()   { return this.form.get('sRate')   as FormControl; }
  get hours()   { return this.form.get('hours')   as FormControl; }
  get minutes() { return this.form.get('minutes') as FormControl; }

  get token() { return this._user.token; }

  ngOnInit() {
    this.form.disable();

    if (this.token) {
      this._rate
          .getByYear(new Date().getFullYear())
          .subscribe({
            next: val => {
              this.form.enable();
              this.cols = Object.keys(val[0]).slice(1);
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
      const notifyAt = new Date();
            notifyAt.setHours(this.hours.value, this.minutes.value);

      this.form.disable();

      this._subscription
          .create({
            userId: this.token._id,
            fRate : this.cols[this.fRate.value],
            sRate : this.cols[this.sRate.value],
            notifyAt
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
