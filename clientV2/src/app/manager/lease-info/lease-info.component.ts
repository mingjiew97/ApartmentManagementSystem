import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lease} from '../../modules/Lease';
import {Router} from '@angular/router';
import {LeaseService} from '../../services/lease.service';
import {RoomService} from '../../services/room.service';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-lease-info',
  templateUrl: './lease-info.component.html',
  styleUrls: ['./lease-info.component.scss']
})
export class LeaseInfoComponent implements OnInit {
  userValue = null;
  registerForm: FormGroup;
  submitted = false;
  roomNumber = null;
  minDate = new Date();
  maxDate = new Date(2025, 1, 1);
  employmentLetter = null;
  bankStatement = null;
  photoIdentification = null;
  leaseCopy = null;
  taxForm = null;
  isLinear = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public ls: LeaseService,
    public rs: RoomService,
    public as: AuthService
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

    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
      }
    });

    this.roomNumber = localStorage.getItem('roomNumber');
    if (this.roomNumber === null) {
      this.as.userSubject.subscribe((res) => {
        if (res !== null) {
          this.roomNumber = res.roomNumber;
        }
      });
    }

    if (this.roomNumber !== null) {
      this.ls.getLeaseByRoomNumber(this.roomNumber).subscribe((lease) => {
        if (lease !== null) {
          this.registerForm.controls.roomNumber.setValue(lease.roomNumber);
          this.registerForm.controls.partyA.setValue(lease.partyA);
          this.registerForm.controls.partyB.setValue(lease.partyB);
          this.registerForm.controls.rent.setValue(lease.rent);
          this.registerForm.controls.deposit.setValue(lease.deposit);
          this.registerForm.controls.leaseStartDate.setValue(new Date(lease.leaseStartDate));
          this.registerForm.controls.leaseEndDate.setValue(new Date(lease.leaseEndDate));
          this.employmentLetter = environment.API_URL + '/downloadFile/' + lease.employmentLetter;
          this.bankStatement = environment.API_URL + '/downloadFile/' + lease.BankStatement;
          this.taxForm = environment.API_URL + '/downloadFile/' + lease.taxFrom;
          this.photoIdentification = environment.API_URL + '/downloadFile/' + lease.photoIdentification;
          this.leaseCopy = environment.API_URL + '/downloadFile/' + lease.leaseCopy;
        } else {
          this.router.navigate(['/home']);
          alert('Currently, there is no lease binding to this room!');
        }
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    localStorage.setItem('roomNumber', this.roomNumber);
    this.router.navigate(['manager/edit-lease']);
  }

  editLease() {
    this.router.navigate(['/manager/edit-lease']);
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
