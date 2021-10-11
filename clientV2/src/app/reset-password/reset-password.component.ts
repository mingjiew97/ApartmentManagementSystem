import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {EmailService} from '../services/email.service';
import {HeaderComponent} from '../commons/header/header.component';
import {BehaviorSubject} from 'rxjs';
import {User} from '../modules/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  userValue = null;

  constructor(
    private as: AuthService,
    private router: Router,
    private es: EmailService,
    private h: HeaderComponent
  ) { }

  ngOnInit() {
    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
      }
    });
  }

  reset(value) {
    this.userValue.password = value.newPassword;
    this.es.resetPasswordAfter(this.userValue).subscribe((res) => {
      if (res.success) {
        this.logout();
      } else {
        alert('Bad!!');
      }
    });
  }

  logout() {
    this.as.logout()
      .subscribe((res: {success: true}) => {
        if (res.success) {
          localStorage.clear();
          this.as.userSubject = new BehaviorSubject<User>(null);
          this.h.ngOnInit();
          alert('logged out! Please use your new password to log in!');
          this.router.navigate(['/home']);
          this.as.userSubject.next(null);
        } else {
          alert('can not log out!!');
        }
      });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
