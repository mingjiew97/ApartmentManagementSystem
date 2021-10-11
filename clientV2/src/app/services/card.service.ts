import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Card} from '../modules/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    public http: HttpClient
  ) { }

  saveCard(c: Card): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/card`, c);
  }

  getCardByUsername(username: string): Observable<Card> {
    return this.http.get<Card>(`${environment.API_URL}/card/${username}`);
  }
}
