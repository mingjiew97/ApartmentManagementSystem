import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Room} from '../../modules/Room';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  roomTypes: any = ['Studio', '1B1B', '2B1B', '2B2B', '4B2B'];
  roomStatus: any = ['Vacant', 'Available Soon'];
  submitted = false;
  registerForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public rs: RoomService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roomType: ['', Validators.required],
      roomNumber: ['', Validators.required],
      roomArea: ['', Validators.required],
      status: ['', Validators.required],
      deposit: ['', Validators.required]
    });
    this.registerForm.controls.status.setValue('Vacant');
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

    this.rs.registerRoom(this.registerForm.value as Room)
      .subscribe(res => {
        console.log(res);
        if (res.containsRoom && res.insertRoom) {
          alert('You have successfully registered Room ' + this.registerForm.value.roomNumber);
        } else if (!res.containsRoom) {
          alert('Room ' + this.registerForm.value.roomNumber + ' has already been registered');
        } else if (!res.insertRoom) {
          alert('Room registration failed');
        } else {
          alert('Registration Failed');
        }
      });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
