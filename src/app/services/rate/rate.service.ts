import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRate }       from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) { }

  get(page: number) {
    return this._http.get<IRate[]>(`${ this.apiUrl }/rates/${ page }`);
  }
}
