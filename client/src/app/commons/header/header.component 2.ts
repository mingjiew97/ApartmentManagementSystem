import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = false;

  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.as.logout()
      .subscribe((res: {success: true}) => {
        if (res.success) {
          alert('log out successfully!!');
          this.router.navigate(['/home']);
          this.as.userSubject.next(null);
        } else {
          alert('can not log out!!');
        }
      });
  }

}
