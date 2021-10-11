import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lease} from '../modules/Lease';
import {environment} from '../../environments/environment';
import {User} from '../modules/User';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    public http: HttpClient
  ) { }

  resetPasswordBefore(username: string): Observable<{success: boolean}> {
    return this.http.get<{success: boolean}>(`${environment.API_URL}/resetPassword/${username}`);
  }

  resetPasswordAfter(u: User): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/resetPassword`, u);
  }
}
