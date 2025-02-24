import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/products`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/api/v1/products/${productId}`
    );
  }
}
