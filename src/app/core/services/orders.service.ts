import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl: string = environment.baseUrl;
  redirectUrl: string = environment.redirectUrl;

  constructor(private httpClient: HttpClient) { }
  onlinePayment(cartId: string, formData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      "shippingAddress": formData
    },
    )
  }
  cashPayment(cartId: string, formData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/orders/${cartId}`, {
      "shippingAddress": formData
    },
    )
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/orders/user/${id}`)
  }
}
