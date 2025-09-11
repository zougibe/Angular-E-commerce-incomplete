import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/BaseURL';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id: object) {
    if (isPlatformBrowser(Id)) {
      this.token = { token: localStorage.getItem('userToken') || '' }
    }
  }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/cart`,
      { productId: productId },
      {
        headers: this.token
      }
    )
  }

  getProductToCart(): Observable<any> {
    return this.http.get(`${baseUrl.baseUrl}/cart`,
      {
        headers: this.token
      }
    )
  }

  updateProductToCart(productId: string, count: number): Observable<any> {
    return this.http.put(`${baseUrl.baseUrl}/cart/${productId}`,
      { count: productId },
      {
        headers: this.token
      }
    )
  }

  removeProduct(productId: string): Observable<any> {
    return this.http.delete(`${baseUrl.baseUrl}/cart/${productId}`,
      {
        headers: this.token
      }
    )
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${baseUrl.baseUrl}/cart/`,
      {
        headers: this.token
      }
    )
  }
}
