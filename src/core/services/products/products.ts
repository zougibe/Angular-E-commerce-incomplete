import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsList } from '../../../Shared/interfaces/products';
import { baseUrl } from '../../constant/BaseURL';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = `${baseUrl.baseUrl}/products/`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<ProductsList[]>(this.API_URL);
  }
  getSpecificProduct(id: string): Observable<any> {
    return this.http.get<ProductsList[]>(`${this.API_URL}${id}`)
  }
}
