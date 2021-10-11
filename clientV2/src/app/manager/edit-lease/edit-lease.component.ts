import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LeaseService} from '../../services/lease.service';
import {RoomService} from '../../services/room.service';
import {Lease} from '../../modules/Lease';
import {Room} from '../../modules/Room';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.component.html',
  styleUrls: ['./edit-lease.component.scss']
})
export class EditLeaseComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  roomNumber: string;
  lease: Lease;
  minDate = new Date();
  maxDate = new Date(2025, 1, 1);
  origionalDate;
  origionalDeposit;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public ls: LeaseService,
    public rs: RoomService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      leaseId: [''],
      roomNumber: ['', Validators.required],
      partyA: ['', Validators.required],
      partyB: ['', Validators.required],
      rent: ['', Validators.required],
      deposit: ['', Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required],
    });

    this.ls.getLeaseByRoomNumber(localStorage.getItem('roomNumber')).subscribe((lease) => {
      this.lease = lease;
      if (this.lease !== null) {
        const LSD = new Date(this.lease.leaseStartDate);
        this.origionalDate = LSD;
        this.origionalDeposit = lease.deposit;
        const LED = new Date(this.lease.leaseEndDate);
        this.registerForm.controls.leaseId.setValue(this.lease.leaseId);
        this.registerForm.controls.roomNumber.setValue(this.lease.roomNumber);
        this.registerForm.controls.partyA.setValue(this.lease.partyA);
        this.registerForm.controls.partyB.setValue(this.lease.partyB);
        this.registerForm.controls.rent.setValue(this.lease.rent);
        this.registerForm.controls.deposit.setValue(this.lease.deposit);
        this.registerForm.controls.leaseStartDate.setValue(LSD);
        this.registerForm.controls.leaseEndDate.setValue(LED);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    let balance = 0;
    if (this.registerForm.value.leaseStartDate !== this.origionalDate) {
      const diffTime = this.origionalDate - this.registerForm.value.leaseStartDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      balance += (diffDays * parseInt(this.registerForm.value.rent, 10) / 30);
    }
    if (this.registerForm.value.deposit !== this.origionalDeposit) {
      balance += (this.registerForm.value.deposit - this.origionalDeposit);
    }
    this.ls.editLeaseByLeaseId(this.registerForm.value as Lease).subscribe((res) => {
      if (res.success) {
        this.rs.getRoomByRoomNumber(this.registerForm.value.roomNumber).subscribe((r) => {
          if (r !== null) {
            console.log(r.remainedBalance);
            this.rs.changeRoomBalance({roomNumber: r.roomNumber, remainedBalance: r.remainedBalance + balance} as Room).subscribe((res3) => {
              if (res3.success) {
                localStorage.setItem('roomNumber', this.registerForm.value.roomNumber);
                this.router.navigate(['users/lease-info']);
                alert('Edit Success!');
              } else {
                alert('Bad!');
              }
            });
          }
        });
      } else {
        alert('Some Error happens during the process, we cannot edit the Lease now!!');
      }
    });
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }
}
