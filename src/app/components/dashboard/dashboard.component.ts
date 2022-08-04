import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ISubscription } from '../../interfaces';
import {
  SnackbarService,
  SubscriptionService,
  UserService,
} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs: ISubscription[] = [];

  isLoading = true;

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService,
    private readonly _userService: UserService,
    private readonly _subscriptionService: SubscriptionService
  ) {}

  get token() {
    return this._userService.token;
  }

  ngOnInit() {
    if (this._userService.token) {
      this._subscription.add(
        this._userService.get(this.token._id, true).subscribe({
          next: (value) => {
            this.subs = value.subscriptions;
          },
          error: (error) => {
            console.error(error.message);
          },
          complete: () => {
            this.isLoading = false;
          },
        })
      );
    } else {
      this._router.navigate(['/']).then();
      this._snackbarService.open(
        'You must be logged in to access the dashboard!'
      );
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  unsubscribe(id: string) {
    this.isLoading = true;

    this._subscription.add(
      this._subscriptionService.delete(id).subscribe({
        next: () => {
          this.subs = this.subs.filter((i) => i._id !== id);
          this._snackbarService.open('You have successfully unsubscribed!');
        },
        error: (error) => {
          console.error(error.message);
          this._snackbarService.open(
            'Something went wrong! Please try again later!'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    );
  }
}
