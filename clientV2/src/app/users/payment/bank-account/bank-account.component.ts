import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {RoomService} from '../../../services/room.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  checked = false;
  payAmount = null;
  userValue = null;
  room = null;

  constructor(
    public as: AuthService,
    public rs: RoomService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.payAmount = parseInt(localStorage.getItem('PayAmount'), 10);

    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
        this.rs.getRoomByRoomNumber(u.roomNumber).subscribe((r) => {
          if (r !== null) {
            this.room = r;
          }
        });
      }
    });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    // return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/paymentBackGround.jpg\')';
    // return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/payment2.jpg\')';
    return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/background0.jpg\')';
  }

  changeChecked() {
    if (!this.checked) {
      alert('By checking this box, you understand that you will be charged at the 3rd of every month!');
    }
    this.checked = !this.checked;
  }

  pay() {
    this.rs.changeRoomBalance({
      roomNumber: this.userValue.roomNumber,
      remainedBalance: this.room.remainedBalance - this.payAmount
    }).subscribe((res) => {
      alert('Successfully Paid Your Rent!');
      this.router.navigate(['/users/payment']);
    });
  }



}
