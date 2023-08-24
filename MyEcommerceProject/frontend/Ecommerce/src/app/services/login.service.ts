import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  jwtTokenUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  generateToken(credentials: any) {
    return this.httpClient.post(this.jwtTokenUrl, credentials, {
      responseType: 'text' as 'json',
    });
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token === undefined || token === '' || token === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
