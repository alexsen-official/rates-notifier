import { Injectable } from '@angular/core';

import { ISubscription } from '../../interfaces';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private readonly _request: RequestService) {}

  get(id: string) {
    return this._request.get<ISubscription>(`subscriptions/${id}`);
  }

  getAll() {
    return this._request.get<ISubscription[]>('subscriptions');
  }

  create(subscription: ISubscription) {
    return this._request.post<ISubscription>('subscriptions', subscription);
  }

  update(subscription: ISubscription) {
    return this._request.put<ISubscription>('subscriptions', subscription);
  }

  delete(id: string) {
    return this._request.delete<ISubscription>(`subscriptions/${id}`);
  }
}
