import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl: string = environment.baseUrl;
  userToken = localStorage.getItem('userToken') as string
  constructor(private httpClient: HttpClient) { }
  onlinePayment(cartId: string, formData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      "shippingAddress": formData
    },
      {
        headers: {
          token: this.userToken
        }
      })
  }
}
