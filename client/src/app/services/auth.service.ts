import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = 'http://localhost:8080';

  userSubject: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) {
    this.checkLogin();
  }

  checkLogin() {
    this.http.get(`${this.AUTH_API_URL}/checklogin`, {withCredentials: true})
      .subscribe((res: {success: boolean, user: User}) => {
        if (res.success) {
          this.userSubject.next(res.user);
        }
      });
  }

  login(user: User): Observable<{success: boolean, user: User}> {
    const httpParams: HttpParams = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/users/login`, httpParams, {withCredentials: true})
      .pipe(
        map((res: {success: boolean, user: User}) => {
          this.userSubject.next(res.user);
          return res;
        })
      );
  }

  register(user: User): Observable<{containsUser: boolean, insertUser: boolean}> {
    return this.http.post<{containsUser: boolean, insertUser: boolean, user: User}>(`${this.AUTH_API_URL}/users/register`, user);
  }

  logout(): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${this.AUTH_API_URL}/users/logout`, null, {withCredentials: true});
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`${error.error}`);
  }


}
