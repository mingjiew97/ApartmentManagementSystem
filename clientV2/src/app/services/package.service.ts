import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../modules/Room';
import {Package} from '../modules/Package';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  API_URL = 'http://localhost:8080';
  constructor(
    public http: HttpClient
  ) { }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${environment.API_URL}/packages`);
  }

  getPackageByUsername(username: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${environment.API_URL}/packages/${username}`);
  }

  addPackage(newPackage: Package): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/packages/post-package`, newPackage, {withCredentials: true});
  }

  editPackage(newPackage: Package): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/packages/edit-package`, newPackage, {withCredentials: true});
  }

  getPackageByTrackingNumber(trackingNumber: string): Observable<{success: boolean}> {
    return this.http.get<{success: boolean}>(`${environment.API_URL}/packages/trackingNumber/${trackingNumber}`);
  }

  deletePackageById(id: number): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/packages/${id}`);
  }
}
