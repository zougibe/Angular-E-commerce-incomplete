import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Auth } from '../../../Shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode'
import { baseUrl } from '../../constant/BaseURL';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) Id: object, private router: Router) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.currentUser()
      }
    }

  }
  register(formData: Auth): Observable<any> {
    return this._http.post(`${baseUrl.baseUrl}/auth/signup`, formData)
  }

  login(formData: Auth): Observable<any> {
    // this.decodeUserData()
    return this._http.post(`${baseUrl.baseUrl}/auth/signin`, formData)
  }

  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  currentUser() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token) || '';
    this.userData.next(decoded)

  }


  verifyToken(): Observable<any> {
    return this._http.get(`${baseUrl.baseUrl}/auth/verifyToken`)
  }
}
