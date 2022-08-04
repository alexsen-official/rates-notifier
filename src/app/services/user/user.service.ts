import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { IUser } from '../../interfaces';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _request: RequestService) {}

  get token() {
    return JSON.parse(localStorage.getItem('token') || 'null') as IUser;
  }

  get(id: string, populate: boolean = false) {
    return this._request.get<IUser>(
      `users/${id}${populate ? '/subscriptions' : ''}`
    );
  }

  getAll() {
    return this._request.get<IUser[]>('users');
  }

  create(user: IUser) {
    return this._request.post<IUser>('users', user);
  }

  login(user: IUser) {
    return this._request
      .post<IUser>('users/login', user)
      .pipe(map((user) => localStorage.setItem('token', JSON.stringify(user))));
  }

  logout() {
    localStorage.removeItem('token');
  }

  update(user: IUser) {
    return this._request.put<IUser>('users', user);
  }

  delete(id: string) {
    return this._request.delete<IUser>(`users/${id}`);
  }
}
