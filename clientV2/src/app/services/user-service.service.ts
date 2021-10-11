import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../modules/Room';
import {Observable} from 'rxjs';
import {Service} from '../modules/Service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  API_URL = 'http://localhost:8080';

  constructor(
    public http: HttpClient
  ) { }

  addNewService(service: Service): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/services`, service);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.API_URL}/services`);
  }

  getServices(roomNumber: string): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.API_URL}/services/${roomNumber}`);
  }

  getServiceByServiceId(serviceId: string): Observable<Service> {
    return this.http.get<Service>(`${environment.API_URL}/services/id/${serviceId}`);
  }

  editService(service: Service): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/services`, service);
  }

  editServiceByStaff(service: Service): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/staff/services`, service);
  }

  editServiceByStaffComplete(service: Service): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/complete/services`, service);
  }

  deleteService(serviceId: number): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/services/${serviceId}`);
  }

}
