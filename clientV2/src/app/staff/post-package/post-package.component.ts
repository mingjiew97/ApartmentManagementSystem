import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {UserServiceService} from '../../services/user-service.service';
import {AuthService} from '../../services/auth.service';
import {PackageService} from '../../services/package.service';
import {Package} from '../../modules/Package';

@Component({
  selector: 'app-post-package',
  templateUrl: './post-package.component.html',
  styleUrls: ['./post-package.component.scss']
})
export class PostPackageComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  users;
  residenceList = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
    private ps: PackageService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      trackingNumber: ['', Validators.required],
      renterId: ['', Validators.required],
      packageArrivalTime: [''],
      status: [''],
    });

    this.as.getAllUsers().subscribe((res) => {
      if (res !== null) {
        this.users = res;
      }
    });
  }

  getUserList() {
    this.residenceList.length = 0;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].roomNumber === this.registerForm.value.roomNumber) {
        this.residenceList.push(this.users[i]);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.controls.packageArrivalTime.setValue(new Date());
    this.registerForm.controls.status.setValue('Arrived');
    this.ps.getPackageByTrackingNumber(this.registerForm.value.trackingNumber).subscribe((res0) => {
      if (res0.success) {
        this.ps.addPackage(this.registerForm.value as Package).subscribe((res) => {
          if (res.success) {
            alert('Package Added!');
          } else {
            alert('Bad!');
          }
        });
      } else {
        alert('Same Package has been added!');
      }
    });
  }

  get f() { return this.registerForm.controls; }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
