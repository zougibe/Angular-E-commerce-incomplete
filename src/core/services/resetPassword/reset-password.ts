import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/interfaces/auth';
import { baseUrl } from '../../constant/BaseURL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPassword {

  constructor(private _http: HttpClient) {

  }

  verifyEmail(payload: Auth): Observable<any> {
    return this._http.post(`${baseUrl.baseUrl}/auth/forgotPasswords`, payload)
  }

  verifyCode(payload: Auth): Observable<any> {
    return this._http.post(`${baseUrl.baseUrl}/auth/verifyResetCode`, payload)
  }

  resetPassword(payload: Auth): Observable<any> {
    return this._http.put(`${baseUrl.baseUrl}/auth/resetPassword`, payload)
  }
}
