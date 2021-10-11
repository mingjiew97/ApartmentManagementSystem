import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {User} from '../../modules/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss']
})
export class SearchRoomComponent implements OnInit {

  submitted = false;
  selected = 'roomNumber';
  roomTypeValue = 'Studio';
  roomStatusValue = 'Vacant'

  constructor(
    public rs: RoomService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  search(value) {
    this.submitted = true;
    if (value.roomNumber === '') {
      return;
    }
    this.rs.getRoomByRoomNumber(value.roomNumber).subscribe((room) => {
      if (room == null) {
        alert('Room ' + value.roomNumber + ' does not exist!!');
      } else {
        this.router.navigate(['/manager/room-info']);
      }
    });
  }

  searchByType() {
    this.submitted = true;
    if (this.roomTypeValue === '') {
      return;
    }
    this.rs.getRoomByRoomType(this.roomTypeValue);
    this.router.navigate(['/manager/get-searched-room']);
  }

  searchByStatus() {
    this.submitted = true;
    if (this.roomStatusValue === '') {
      return;
    }
    this.rs.getRoomByRoomStatus(this.roomStatusValue);
    this.router.navigate(['/manager/get-searched-room']);
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
