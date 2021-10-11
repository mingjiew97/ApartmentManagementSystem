import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {RegisterLoginDataSharingService} from '../../services/register-login-data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private as: AuthService,
    private router: Router,
    private rldss: RegisterLoginDataSharingService
  ) { }

  err = false;
  usernameValue: string;

  ngOnInit() {
    this.rldss.currentMessage.subscribe(message => this.usernameValue = message);
  }

  login(value) {
    console.log(value);

    this.as.login(value as User)
      .subscribe(res => {
        console.log(res.success);
        if (res.success) {
          this.router.navigate(['/home']);
        } else {
          this.err = true;
        }
      });

    console.log(value);
  }

}
