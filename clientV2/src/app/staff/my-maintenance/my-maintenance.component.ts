import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';
import {AuthService} from '../../services/auth.service';
import {MaintenanceService} from '../../services/maintenance.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Maintenance} from '../../modules/Maintenance';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-my-maintenance',
  templateUrl: './my-maintenance.component.html',
  styleUrls: ['./my-maintenance.component.scss']
})
export class MyMaintenanceComponent implements OnInit {

  userValue;
  serviceValue = null;
  maintenanceValue;
  submitted = false;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private ss: UserServiceService,
    private as: AuthService,
    private ms: MaintenanceService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roomNumber: [''],
      information: [''],
      status: [''],
      startTime: [''],
    });

    this.as.userSubject.subscribe((user) => {
      if (user !== null) {
        this.userValue = user;
        this.ms.getMaintenanceByUsername(this.userValue.username).subscribe((m) => {
          if (m !== null) {
           this.maintenanceValue = m;
           this.ss.getServiceByServiceId(this.maintenanceValue.serviceId).subscribe((s) => {
             if (s !== null) {
               this.serviceValue = s;
               this.registerForm.controls.roomNumber.setValue(this.serviceValue.roomNumber);
               this.registerForm.controls.status.setValue(this.serviceValue.status);
               this.registerForm.controls.information.setValue(this.serviceValue.information);
               this.registerForm.controls.startTime.setValue(new Date(this.maintenanceValue.actualStartTime).toLocaleString());
             }
           });
          }
        });
      }
    });
  }

  get f() { return this.registerForm.controls; }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

  onSubmit() {
    this.router.navigate(['staff/complete-maintenance']);
  }
}
