import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../modules/Room';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../modules/User';
import {map} from 'rxjs/operators';
import {Lease} from '../modules/Lease';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  API_URL = 'http://localhost:8080';

  roomObject = null;

  constructor(
    public http: HttpClient
  ) {
  }

  getAllRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.API_URL}/rooms`);
  }

  registerRoom(room: Room): Observable<{containsRoom: boolean, insertRoom: boolean}> {
    return this.http.post<{containsRoom: boolean, insertRoom: boolean, room: Room}>(`${environment.API_URL}/rooms`, room);
  }

  getRoomByRoomNumber(roomNumber: string): Observable<Room> {
    localStorage.setItem('roomStatusCheck', 'false');
    localStorage.setItem('roomTypeCheck', 'false');
    const temp = this.http.get<Room>(`${environment.API_URL}/rooms/${roomNumber}`);
    temp.subscribe((room) => {
      this.roomObject = room;
      localStorage.setItem('roomNumber', this.roomObject.roomNumber);
    });
    return temp;
  }

  getRoomByRoomType(roomType: string): Observable<Room[]> {
    localStorage.setItem('roomType', roomType);
    localStorage.setItem('roomStatusCheck', 'false');
    localStorage.setItem('roomTypeCheck', 'true');
    return this.http.get<Room[]>(`${environment.API_URL}/rooms/roomType/${roomType}`);
  }

  getRoomByRoomStatus(status: string): Observable<Room[]> {
    localStorage.setItem('roomStatus', status);
    localStorage.setItem('roomStatusCheck', 'true');
    localStorage.setItem('roomTypeCheck', 'false');
    return this.http.get<Room[]>(`${environment.API_URL}/rooms/roomStatus/${status}`);
  }

  editRoomByRoomNumber(room: Room): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/rooms/edit-room`, room, {withCredentials: true});
  }

  addNewLeaseToRoom(lease: Lease): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/rooms/add-lease`, lease, {withCredentials: true});
  }

  deleteLease(room: Room): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/rooms/delete-lease`, room, {withCredentials: true});
  }

  changeRoomBalance(room: Room): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/rooms/change-balance`, room, {withCredentials: true});
  }

  changeRoomStatus(room: Room): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/rooms/change-status`, room, {withCredentials: true});
  }
}
