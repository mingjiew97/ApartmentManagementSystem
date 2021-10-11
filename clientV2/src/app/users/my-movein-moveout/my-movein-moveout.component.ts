import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MoveinMoveoutService} from '../../services/movein-moveout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-movein-moveout',
  templateUrl: './my-movein-moveout.component.html',
  styleUrls: ['./my-movein-moveout.component.scss']
})
export class MyMoveinMoveoutComponent implements OnInit {

  userValue = null;
  type;
  status;
  startTime;
  endTime;

  constructor(
    public as: AuthService,
    public ms: MoveinMoveoutService,
    public router: Router,
  ) { }

  ngOnInit() {

    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
        this.ms.getByRoomNumber(u.roomNumber).subscribe((lss) => {
          if (lss.length === 0) {
            alert('No Schedule Currently!');
            this.router.navigate(['/home']);
          } else {
            if (lss[0].reason === 'moveIn') {
              this.type = 'Move In';
            } else {
              this.type = 'Move Out';
            }
            this.startTime = new Date(lss[0].startTime).toLocaleString();
            this.endTime = new Date(lss[0].endTime).toLocaleString();
            this.status = lss[0].approved;
          }
        });
      }
    });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
