import { Component, OnInit } from '@angular/core';
import {SchedulerEvent} from '@progress/kendo-angular-scheduler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MoveinMoveoutService} from '../../services/movein-moveout.service';
import {LiftSchedule} from '../../modules/LiftSchedule';

@Component({
  selector: 'app-move-in-move-out',
  templateUrl: './move-in-move-out.component.html',
  styleUrls: ['./move-in-move-out.component.scss']
})
export class MoveInMoveOutComponent implements OnInit {

  userValue;
  submitted = false;
  registerForm: FormGroup;
  minDate = new Date();
  maxDate = new Date(2025, 1, 1);
  disabled = false;
  lsByRoom = [];

  constructor(
    public as: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    public ms: MoveinMoveoutService
  ) { }

  ngOnInit() {
    this.as.userSubject.subscribe((res) => {
      if (res !== null) {
        this.userValue = res;
        this.ms.getByRoomNumber(res.roomNumber).subscribe((lss) => {
          if (lss.length !== 0) {
            this.lsByRoom = lss;
            this.disabled = true;
            if (lss[0].approved === 'Denied') {
              this.disabled = false;
            }
          }
        });
      }
    });

    this.registerForm = this.formBuilder.group({
      serviceDate: ['', Validators.required],
      preferableStartTime: ['', Validators.required],
      preferableEndTime: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this.registerForm.controls.reason.setValue('moveIn');
    this.registerForm.controls.serviceDate.setValue(new Date());
    this.registerForm.controls.preferableStartTime.setValue('09:00');
    this.registerForm.controls.preferableEndTime.setValue('20:00');
  }

  get f() { return this.registerForm.controls; }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

  onSubmit() {
    this.submitted = true;

    if (this.disabled) {
      alert('There is one Request pending... Please Wait...');
      return;
    }

    if (this.lsByRoom.length !== 0) {
      alert('Previous denied Schedule has been deleted.');
      this.ms.deleteById(this.lsByRoom[0].liftScheduleId).subscribe((res) => {
      });
    }

    const startTime = new Date();
    startTime.setFullYear(this.registerForm.value.serviceDate.getFullYear());
    startTime.setMonth(this.registerForm.value.serviceDate.getMonth());
    startTime.setDate(this.registerForm.value.serviceDate.getDate());
    const startTimeHM = this.registerForm.value.preferableStartTime.split(':');
    if (this.registerForm.value.preferableStartTime.slice(-2) === 'PM') {
      startTime.setHours(parseInt(startTimeHM[0], 10) + 12);
    } else {
      startTime.setHours(parseInt(startTimeHM[0], 10));
    }
    startTime.setMinutes(parseInt(startTimeHM[1], 10));
    const endTime = new Date();
    if (this.registerForm.value.preferableEndTime !== null) {
      endTime.setFullYear(this.registerForm.value.serviceDate.getFullYear());
      endTime.setMonth(this.registerForm.value.serviceDate.getMonth());
      endTime.setDate(this.registerForm.value.serviceDate.getDate());
      const endTimeHM = this.registerForm.value.preferableEndTime.split(':');
      if (this.registerForm.value.preferableEndTime.slice(-2) === 'PM') {
        endTime.setHours(parseInt(endTimeHM[0], 10) + 12);
      } else {
        endTime.setHours(parseInt(endTimeHM[0], 10));
      }
      endTime.setMinutes(parseInt(endTimeHM[1], 10));

      if (endTime < startTime) {
        alert('Ending Time is Earlier than Starting Time, please check your input and re-enter the value!');
        return;
      }
      if (this.registerForm.value.serviceDate <= new Date()) {
        if (this.compareTwoDate(endTime, new Date())) {
          alert('The time that you provided is invalid. Please check your input and re-enter the value!');
          return;
        }
      }
    }
    if (this.registerForm.value.serviceDate <= new Date()) {
      if (this.compareTwoDate(startTime, new Date())) {
        alert('The time that you provided is invalid. Please check your input and re-enter the value!');
        return;
      }
    }

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      alert('Error in this page, please fix it!');
      return;
    }

    this.ms.createNewSchedule({
      startTime: startTime,
      endTime: endTime,
      reason: this.registerForm.value.reason,
      roomNumber: this.userValue.roomNumber,
      approved: 'Pending'
    } as LiftSchedule).subscribe((res) => {
      if (res.success) {
        alert('Request Sent');
        this.router.navigate(['/home']);
      } else {
        alert('Bad!');
      }
    });
  }

  compareTwoDate(d1, d2) {
    if (d1.getYear() < d2.getYear()) {
      return false;
    }
    if (d1.getYear() > d2.getYear()) {
      return true;
    }
    if (d1.getMonth() < d2.getMonth()) {
      return false;
    }
    if (d1.getMonth() > d2.getMonth()) {
      return true;
    }
    if (d1.getDate() < d2.getDate()) {
      return false;
    }
    if (d1.getDate() > d2.getDate()) {
      return true;
    }
    if (d1.getHours() < d2.getHours()) {
      return false;
    }
    if (d1.getHours() > d2.getHours()) {
      return true;
    }
    if (d1.getMinutes() < d2.getMinutes()) {
      return false;
    }
    if (d1.getMinutes() > d2.getMinutes()) {
      return true;
    }
  }
}
