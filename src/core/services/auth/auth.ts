import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null
  constructor(private _http: HttpClient) {

  }
  register(formData: Auth): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData)
  }

  login(formData: Auth): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formData)

  }
  decodeUserData() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData = decoded
  }
}
