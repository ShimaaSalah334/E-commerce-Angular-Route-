import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  getBrands(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/brands`);

  }
}
