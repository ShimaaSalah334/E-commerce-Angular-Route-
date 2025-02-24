import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }
  baseUrl: string = environment.baseUrl;
  userData: any;
  register(form: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, form);
  }
  login(form: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signin`, form);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
    this.userData = null
  }
  decodeToken() {
    const token = localStorage.getItem('userToken') as string;
    this.userData = jwtDecode(token);
  }
}
