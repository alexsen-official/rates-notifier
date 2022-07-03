import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import {
  map,
  startWith,
  switchMap
} from 'rxjs/operators';

import { IRate }       from '../../interfaces';
import { RateService } from '../../services';

@Component({
  selector: 'app-rate-table',
  styleUrls: [ 'rate-table.component.scss' ],
  templateUrl: 'rate-table.component.html'
})
export class RateTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  rates: IRate[] = [];
  cols: string[] = [];

  isLoading = true;

  constructor(private readonly _rate: RateService) { }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this._rate.get(this.paginator.pageIndex);
      }),
      map(rates => {
        this.isLoading = false;
        this.cols = Object.keys(rates[0]).slice(1, -1);

        return rates;
      }))
      .subscribe({
        next: rates => {
          this.rates = rates;

          if (!this.paginator.getNumberOfPages()) {
            this.paginator.length = rates.length;
            this.paginator.lastPage();
          }
        }, error: error => console.error(error)
      });
  }
}
