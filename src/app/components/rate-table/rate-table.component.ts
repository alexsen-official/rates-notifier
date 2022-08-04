import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { IRate } from '../../interfaces';
import { RateService, UserService } from '../../services';

@Component({
  selector: 'app-rate-table',
  styleUrls: ['rate-table.component.scss'],
  templateUrl: 'rate-table.component.html',
})
export class RateTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  rates: IRate[] = [];
  cols: string[] = [];

  isLoading = true;

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _rateService: RateService,
    private readonly _userService: UserService
  ) {}

  get token() {
    return this._userService.token;
  }

  ngAfterViewInit() {
    this._subscription.add(
      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoading = true;
            return this._rateService.getByPage(this.paginator.pageIndex);
          }),
          map((rates) => {
            this.isLoading = false;
            this.cols = Object.keys(rates[0]);

            return rates;
          })
        )
        .subscribe({
          next: (rates) => {
            this.rates = rates;

            if (!this.paginator.getNumberOfPages()) {
              this.paginator.length = rates.length;
              this.paginator.lastPage();
            }
          },
          error: (error) => {
            console.error(error.message);
          },
        })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
