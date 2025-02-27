import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = environment.baseUrl;
  userToken = localStorage.getItem('userToken') as string
  constructor(private httpClient: HttpClient) { }
  addToCart(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/cart`, {
      "productId": id
    },
      {
        headers: {
          token: this.userToken
        }
      })

  }
  getCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/cart`,
      {
        headers: {
          token: this.userToken
        }
      })

  }

}
