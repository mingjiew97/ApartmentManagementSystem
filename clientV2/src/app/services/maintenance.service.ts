import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserServiceService} from './user-service.service';
import {Observable} from 'rxjs';
import {Maintenance} from '../modules/Maintenance';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  API_URL = 'http://localhost:8080';

  constructor(
    public http: HttpClient,
  ) { }

  getAllMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${environment.API_URL}/maintenances`);
  }

  createNewMaintenance(m: Maintenance): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/maintenances`, m);
  }

  getMaintenanceByServiceId(serviceId: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${environment.API_URL}/maintenances/serviceId/${serviceId}`);
  }

  getMaintenanceByUsername(username: string): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${environment.API_URL}/maintenances/staff/${username}`);
  }

  completeMaintenance(maintenance: Maintenance): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/maintenances`, maintenance);
  }

  checkStaffMaintenanceAmount(username: string): Observable<{success: boolean}> {
    return this.http.get<{success: boolean}>(`${environment.API_URL}/maintenances/check-staff/${username}`);
  }

}
