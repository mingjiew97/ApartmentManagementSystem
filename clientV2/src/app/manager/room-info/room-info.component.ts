import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../modules/Room';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  room = null;
  userValue = null;
  pictureSrc = [
    'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/roominfo1.jpg',
    'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/roominfo2.jpg',
    'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/roominfo3.jpg',
    'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/roominfo4.jpg',
    'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/roominfo5.jpg',
  ];

  constructor(
    public router: Router,
    public rs: RoomService,
    public as: AuthService
  ) {
    this.getRoomInformation();
  }

  ngOnInit() {
    this.as.userSubject.subscribe((res) => {
      if (res !== null) {
        this.userValue = res;
      }
    });
  }

  getRoomInformation() {
    let roomNumber = localStorage.getItem('roomNumber');
    if (roomNumber !== null) {
      this.rs.getRoomByRoomNumber(roomNumber).subscribe((room) => {
        this.room = room;
      });
    } else {
      this.as.userSubject.subscribe((res) => {
        roomNumber = res.roomNumber;
        this.rs.getRoomByRoomNumber(roomNumber).subscribe((room) => {
          this.room = room;
        });
      });
    }
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
