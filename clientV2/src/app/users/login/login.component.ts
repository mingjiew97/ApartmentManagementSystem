import { Component, OnInit } from '@angular/core';
import {User} from '../../modules/User';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {LeaseService} from '../../services/lease.service';
import {Room} from '../../modules/Room';
import {HeaderComponent} from '../../commons/header/header.component';
import {log} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err = false;
  submitted = false;
  rooms;
  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  constructor(
    private as: AuthService,
    private router: Router,
    private rs: RoomService,
    private ls: LeaseService,
    private header: HeaderComponent,
  ) {}

  ngOnInit() {
    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        if (u.roomNumber !== null) {
          this.rs.getRoomByRoomNumber(u.roomNumber).subscribe((r) => {
            console.log(r);
            if (r !== null && r.status === 'Booked') {
              this.rs.changeRoomStatus({roomNumber: r.roomNumber, status: 'Occupied'} as Room).subscribe((res) => {
                if (res.success) {
                  console.log('Good!');
                }
              });
            }
          });
        }
      }
    });

    this.rs.getAllRoom().subscribe((r) => {
      this.rooms = r;
      if (this.rooms !== null) {
        for (let i = 0; i < this.rooms.length; i++) {
          this.ls.getLeaseByRoomNumber(this.rooms[i].roomNumber).subscribe((l) => {
            if ( l !== null) {
              const a = new Date();
              const b = new Date(l.leaseEndDate);
              const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
              const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
              const diffDays = Math.floor((utc2 - utc1) / this._MS_PER_DAY);
              if (diffDays < 30 && this.rooms[i].status === 'Occupied') {
                this.rs.changeRoomStatus({roomNumber: this.rooms[i].roomNumber, status: 'Lease Ending Soon'} as Room).subscribe((res) => {
                  if (res.success) {
                    console.log('Good!!!!');
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  login(value) {
    this.submitted = true;
    if (value.username === '' || value.password === '') {
      return;
    }
    this.as.login(value as User)
      .subscribe(res => {
        if (res.success) {
          this.header.ngOnInit();
          this.router.navigate(['/home']);
        } else {
          this.err = true;
          alert('Email/Password incorrect! Please retry!');
        }
      });

  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
