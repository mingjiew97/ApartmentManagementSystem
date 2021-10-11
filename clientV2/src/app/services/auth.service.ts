import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User} from '../modules/User';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Room} from '../modules/Room';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API_URL = 'http://localhost:8080';
  // stores the current logged in userØ
  userSubject: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    public http: HttpClient
  ) {
    this.checkLogin();
  }

  checkLogin() {
    this.http.get(`${environment.API_URL}/checklogin`, {withCredentials: true})
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
    return this.http.post<{success: boolean, user: User}>(`${environment.API_URL}/users/login`, httpParams, {withCredentials: true})
      .pipe(
        map((res: {success: boolean, user: User}) => {
          this.userSubject.next(res.user);
          return res;
        })
      );
  }

  register(user: User): Observable<{containsUser: boolean, insertUser: boolean}> {
    return this.http.post<{containsUser: boolean, insertUser: boolean, user: User}>(`${environment.API_URL}/users/register`, user);
  }

  logout(): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/users/logout`, null, {withCredentials: true});
  }

  editUserInformation(user: User): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/users/edit-user-info`, user, {withCredentials: true});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  getUserById(username: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/${username}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`${error.error}`);
  }

}
