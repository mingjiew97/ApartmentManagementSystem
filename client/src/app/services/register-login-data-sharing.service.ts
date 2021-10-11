import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginDataSharingService {

  private messageSource = new BehaviorSubject('asdfsd');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
