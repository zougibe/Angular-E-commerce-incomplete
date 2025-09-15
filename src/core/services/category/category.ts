import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/BaseURL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get(`${baseUrl.baseUrl}/categories`)
  }

}
