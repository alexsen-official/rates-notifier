import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { map }         from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser }       from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  get token() {
    return JSON.parse(localStorage.getItem('token') || 'null') as IUser;
  }

  get(id: string) {
    return this.http.get<IUser>(`${ this.apiUrl }/users/${ id }`);
  }

  getAll() {
    return this.http.get<IUser[]>(`${ this.apiUrl }/users`);
  }

  create(user: IUser) {
    return this.http.post<IUser>(`${ this.apiUrl }/users`, user);
  }

  login(user: IUser) {
    return this.http
               .post<IUser>(`${ this.apiUrl }/users/login`, user)
               .pipe(map(user =>
                 localStorage.setItem('token', JSON.stringify(user))
               ));
  }

  logout() {
    localStorage.removeItem('token');
  }

  update(user: IUser) {
    return this.http.put<IUser>(`${ this.apiUrl }/users`, user);
  }

  delete(id: string) {
    return this.http.delete<IUser>(`${ this.apiUrl }/users/${ id }`);
  }
}
