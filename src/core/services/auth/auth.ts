import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {

  }
  register(formData: Auth): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData)
  }

  login(formData: Auth): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formData)

  }
}
