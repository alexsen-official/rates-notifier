import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { ISubscription }                                     from '../../interfaces';
import { SnackbarService, SubscriptionService, UserService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subs: ISubscription[] = [];

  isLoading = true;

  constructor(private readonly _router      : Router,
              private readonly _snackbar    : SnackbarService,
              private readonly _user        : UserService,
              private readonly _subscription: SubscriptionService) { }

  get token() { return this._user.token; }

  ngOnInit() {
    if (this._user.token) {
      this._user
          .get(this.token._id, true)
          .subscribe({
            next: val => {
              this.subs = val.subscriptions;
              this.isLoading = false;
            },
            error: err => {
              console.error(err);
              this.isLoading = false;
            }
          });
    }
    else {
      this._router.navigate(['/']).then();
      this._snackbar.open('You must be logged in to access the dashboard!');
    }
  }

  unsubscribe(id: string) {
    this.isLoading = true;

    this._subscription
        .delete(id)
        .subscribe({
          next: () => {
            this.subs = this.subs.filter(i => i._id !== id);
            this.isLoading = false;
            this._snackbar.open('You have successfully unsubscribed!');
          },
          error: err => {
            console.error(err);
            this.isLoading = false;
            this._snackbar.open('Something went wrong! Please try again later!');
          }
        });
  }
}
