import { environment } from './../../../environments/environment';
import { User } from './../../shared/models/User';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = environment.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/user`;
    return this.http.post(api, user).pipe(
        tap(data => data),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth/login`, user).pipe(
      tap((data) => data),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  testJwt() {
    return this.http.post<any>(`${this.endpoint}/auth/testjwt`, {}).pipe(
      tap((data) => data),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

}
