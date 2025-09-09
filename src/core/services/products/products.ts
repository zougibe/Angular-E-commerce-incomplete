import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsList } from '../../../Shared/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'https://ecommerce.routemisr.com/api/v1/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<ProductsList[]>(this.API_URL);
  }
  getSpecificProduct(id: string): Observable<any> {
    return this.http.get<ProductsList[]>(`${this.API_URL}${id}`)
  }
}
