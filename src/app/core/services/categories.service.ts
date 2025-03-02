import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/categories`);
  }
  getSpecificCategory(CategoryId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/api/v1/categories/${CategoryId}`
    );
  }
}
