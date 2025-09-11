import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode'
import { baseUrl } from '../../constant/BaseURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null
  constructor(private _http: HttpClient) {

  }
  register(formData: Auth): Observable<any> {
    return this._http.post(`${baseUrl.baseUrl}/auth/signup`, formData)
  }

  login(formData: Auth): Observable<any> {
    return this._http.post(`${baseUrl.baseUrl}/auth/signin`, formData)

  }
  decodeUserData() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData = decoded
  }
}
