import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ISubscription } from '../../../interfaces';
import {
  RateService,
  SnackbarService,
  SubscriptionService,
  UserService,
} from '../../../services';
import { numericOnlyValidator } from '../../../validators';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent implements OnInit, OnDestroy {
  readonly form = new FormGroup({
    fRate: new FormControl(null, [Validators.required]),

    sRate: new FormControl(null, [Validators.required]),

    hours: new FormControl(10, [
      Validators.required,
      Validators.min(0),
      Validators.max(23),
      numericOnlyValidator(),
    ]),

    minutes: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(59),
      numericOnlyValidator(),
    ]),
  });

  cols: string[] = [];

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _router: Router,
    private readonly _rateService: RateService,
    private readonly _userService: UserService,
    private readonly _subscriptionService: SubscriptionService,
    private readonly _snackbarService: SnackbarService
  ) {}

  get fRate() {
    return this.form.get('fRate') as FormControl;
  }
  get sRate() {
    return this.form.get('sRate') as FormControl;
  }
  get hours() {
    return this.form.get('hours') as FormControl;
  }
  get minutes() {
    return this.form.get('minutes') as FormControl;
  }

  get token() {
    return this._userService.token;
  }

  ngOnInit() {
    this.form.disable();

    if (this.token) {
      this._subscription.add(
        this._rateService.getByYear(new Date().getFullYear()).subscribe({
          next: (value) => {
            this.cols = Object.keys(value[0]).slice(1);
          },
          error: (error) => {
            console.error(error.message);
          },
          complete: () => {
            this.form.enable();
          },
        })
      );

      this._subscription.add(
        this.fRate.valueChanges.subscribe(() => {
          if (this.fRate.value >= this.sRate.value) {
            this.sRate.reset();
          }
        })
      );
    } else {
      this._router.navigate(['/']).then();
      this._snackbarService.open('You must login to subscribe!');
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      const notifyAt = new Date();
      notifyAt.setHours(this.hours.value, this.minutes.value);

      this.form.disable();

      this._subscription.add(
        this._subscriptionService
          .create({
            userId: this.token._id,
            fRate: this.cols[this.fRate.value],
            sRate: this.cols[this.sRate.value],
            notifyAt,
          } as ISubscription)
          .subscribe({
            next: () => {
              this._router.navigate(['/']).then();
              this._snackbarService.open(
                'You have successfully subscribed to updates!'
              );
            },
            error: (error) => {
              console.error(error.message);
              this._snackbarService.open(
                'Something went wrong! Please try again later!'
              );
            },
            complete: () => {
              this.form.enable();
            },
          })
      );
    }
  }
}
