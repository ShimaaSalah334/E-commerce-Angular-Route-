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
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        this.userData = jwtDecode(token);
      } catch (error) {
        console.error("Error decoding token:", error);
        this.userData = null;
      }
    } else {
      console.warn("No token found in local storage");
      this.userData = null;
    }
  }

  forgetPassword(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  confirmCode(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
