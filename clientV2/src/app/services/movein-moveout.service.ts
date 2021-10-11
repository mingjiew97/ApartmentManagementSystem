import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Maintenance} from '../modules/Maintenance';
import {environment} from '../../environments/environment';
import {LiftSchedule} from '../modules/LiftSchedule';

@Injectable({
  providedIn: 'root'
})
export class MoveinMoveoutService {

  constructor(
    public http: HttpClient,
  ) { }

  getAllMoveInMoveOut(): Observable<LiftSchedule[]> {
    return this.http.get<LiftSchedule[]>(`${environment.API_URL}/liftSchedule`);
  }

  createNewSchedule(l: LiftSchedule): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/liftSchedule`, l);
  }

  getByRoomNumber(roomNumber: string): Observable<LiftSchedule[]> {
    return this.http.get<LiftSchedule[]>(`${environment.API_URL}/liftSchedule/${roomNumber}`);
  }

  changeStatus(l: LiftSchedule): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/liftSchedule`, l);
  }

  deleteById(liftScheduleId: number): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/liftSchedule/${liftScheduleId}`);
  }
}
