import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {IgxNavigationDrawerComponent} from 'igniteui-angular';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-payment-home',
  templateUrl: './payment-home.component.html',
  styleUrls: ['./payment-home.component.scss']
})
export class PaymentHomeComponent implements OnInit {

  userValue = null;
  room = null;
  amount = 0;
  paymentType = 'card';
  counto: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
    private rs: RoomService
  ) { }

  ngOnInit() {
    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
        this.rs.getRoomByRoomNumber(u.roomNumber).subscribe((r) => {
          if (r !== null) {
            this.room = r;
            this.amount = this.room.remainedBalance;
          }
        });
      }
    });
  }

  pay() {
    localStorage.setItem('PayAmount', this.amount.toString());
    if (this.paymentType === 'card') {
      alert('We will charge an additional 3% of the fee');
      this.router.navigate(['/users/pay-by-card']);
    } else {
      this.router.navigate(['/users/pay-by-bank']);
    }

  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
