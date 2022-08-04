import { Injectable } from '@angular/core';

import { IRate } from '../../interfaces';
import { RequestService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private readonly _request: RequestService) {}

  getByPage(page: number) {
    return this._request.get<IRate[]>(`rates/page/${page}`);
  }

  getByYear(year: number) {
    return this._request.get<IRate[]>(`rates/year/${year}`);
  }

  getByDate(date: Date) {
    const month = `0${date.getMonth() + 1}`.slice(-2);
    return this._request.get<IRate[]>(
      `rates/date/${date.getFullYear()}${month}`
    );
  }
}
