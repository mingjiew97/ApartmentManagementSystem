import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {EmailService} from '../../services/email.service';
import {HeaderComponent} from '../../commons/header/header.component';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../modules/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;

  constructor(
    private router: Router,
    private es: EmailService,
    public as: AuthService
  ) { }

  ngOnInit() {
  }

  reset(value) {
    this.es.resetPasswordBefore(value.username).subscribe((res) => {
      if (res.success) {
        alert('Temporary Password has been sent to your Email. Please change it as soon as possible!');
        this.router.navigate(['/home']);
      }
    });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
