import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = environment.baseUrl;
  cartItems: WritableSignal<number> = signal(0)
  constructor(private httpClient: HttpClient) { }
  addToCart(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/cart`, {
      "productId": id
    },
    )

  }
  getCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/cart`,
    )

  }
  removeCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,
    )
  }

  udateProductQuantity(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, {
      "count": count
    },
    )

  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart`,
    )

  }
}
