import { Product } from './../interfaces/icart';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = environment.baseUrl;
  searchTerm: WritableSignal<string> = signal("")

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/products`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/api/v1/products/${productId}`
    );
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }
}
