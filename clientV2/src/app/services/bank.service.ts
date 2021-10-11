import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lease} from '../modules/Lease';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Bank} from '../modules/Bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    public http: HttpClient
  ) { }

  saveBank(bank: Bank): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/bank`, bank);
  }

  getBankByUsername(username: string): Observable<Bank> {
    return this.http.get<Bank>(`${environment.API_URL}/bank/${username}`);
  }
}
