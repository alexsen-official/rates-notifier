import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) { }

  get<T>(uri: string) {
    return this._http.get<T>(`${ this.apiUrl }/${ uri }`);
  }

  post<T>(uri: string, payload: Object) {
    return this._http.post<T>(`${ this.apiUrl }/${ uri }`, payload);
  }

  put<T>(uri: string, payload: Object) {
    return this._http.put<T>(`${ this.apiUrl }/${ uri }`, payload);
  }

  delete<T>(uri: string) {
    return this._http.delete<T>(`${ this.apiUrl }/${ uri }`);
  }
}
