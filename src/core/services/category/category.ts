import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/BaseURL';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory() {
    return this.http.get(`${baseUrl.baseUrl}/categories`)
  }

}
