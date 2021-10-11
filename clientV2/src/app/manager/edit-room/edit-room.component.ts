import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Room} from '../../modules/Room';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {

  roomNumber: string;
  roomStatus: any = ['Vacant', 'Occupied', 'Available Soon', 'Booked', 'Lease Ending Soon'];
  submitted = false;
  registerForm: FormGroup;
  roomValue: Room;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public rs: RoomService,
  ) { }

  ngOnInit() {
    this.roomNumber = localStorage.getItem('roomNumber');
    this.registerForm = this.formBuilder.group({
      roomType: ['', Validators.required],
      roomNumber: ['', Validators.required],
      roomArea: ['', Validators.required],
      status: ['', Validators.required],
      deposit: ['', Validators.required]
    });

    this.rs.getRoomByRoomNumber(this.roomNumber).subscribe((res) => {
      this.roomValue = res;
      if (this.roomValue !== null) {
        this.registerForm.controls.roomNumber.setValue(this.roomValue.roomNumber);
        this.registerForm.controls.roomType.setValue(this.roomValue.roomType);
        this.registerForm.controls.roomArea.setValue(this.roomValue.roomArea);
        this.registerForm.controls.status.setValue(this.roomValue.status);
        this.registerForm.controls.deposit.setValue(this.roomValue.deposit);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    // change form submitted
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.rs.editRoomByRoomNumber(this.registerForm.value as Room)
      .subscribe(res => {
        if (res.success) {
          alert('You have edited Room ' + this.roomNumber + ' successfully!!');
        } else {
          alert('Something wrong happens. We cannot update your information currently!');
        }
      });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
