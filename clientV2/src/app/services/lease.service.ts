import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lease} from '../modules/Lease';
import {Room} from '../modules/Room';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  API_URL = 'http://localhost:8080';

  constructor(
    public http: HttpClient
  ) { }

  createNewLease(lease: Lease): Observable<{success: boolean}> {
    return this.http.post<{success: boolean, lease: Lease}>(`${environment.API_URL}/lease`, lease);
  }

  getLeaseByRoomNumber(roomNumber: string): Observable<Lease> {
    return this.http.get<Lease>(`${environment.API_URL}/lease/${roomNumber}`);
  }

  deleteLeaseByLeaseId(leaseId: string): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/lease/${leaseId}`);
  }

  editLeaseByLeaseId(lease: Lease): Observable<{success: boolean}> {
    return this.http.put<{success: boolean, lease: Lease}>(`${environment.API_URL}/lease`, lease);
  }
}
