import { Component, OnInit } from '@angular/core';
import {LeaseService} from '../../services/lease.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lease} from '../../modules/Lease';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-cancel-lease',
  templateUrl: './cancel-lease.component.html',
  styleUrls: ['./cancel-lease.component.scss']
})
export class CancelLeaseComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  roomNumber: string;
  lease: Lease;
  minDate = new Date();
  maxDate = new Date(2025, 1, 1);

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public ls: LeaseService,
    public rs: RoomService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      partyA: ['', Validators.required],
      partyB: ['', Validators.required],
      rent: ['', Validators.required],
      deposit: ['', Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required],
    });

    // this.ls.getLeaseByLeaseId(localStorage.getItem('roomNumber')).subscribe((lease) => {
    //   this.lease = lease;
    //   if (this.lease !== null) {
    //     this.registerForm.controls.roomNumber.setValue(this.lease.roomNumber);
    //     this.registerForm.controls.partyA.setValue(this.lease.partyA);
    //     this.registerForm.controls.partyB.setValue(this.lease.partyB);
    //     this.registerForm.controls.rent.setValue(this.lease.rent);
    //     this.registerForm.controls.deposit.setValue(this.lease.deposit);
    //     this.registerForm.controls.leaseStartDate.setValue(this.lease.leaseStartDate);
    //     this.registerForm.controls.leaseEndDate.setValue(this.lease.leaseEndDate);
    //   }
    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('xxx');
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
