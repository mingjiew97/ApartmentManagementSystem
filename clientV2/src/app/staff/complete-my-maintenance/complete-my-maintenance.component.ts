import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MaintenanceService} from '../../services/maintenance.service';
import {Maintenance} from '../../modules/Maintenance';

@Component({
  selector: 'app-complete-my-maintenance',
  templateUrl: './complete-my-maintenance.component.html',
  styleUrls: ['./complete-my-maintenance.component.scss']
})
export class CompleteMyMaintenanceComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  userValue = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
    private ms: MaintenanceService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      finishedMessage: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.as.userSubject.subscribe((user) => {
      if (user !== null) {
        this.userValue = user;
      }
    });
    if (this.userValue !== null) {
      this.ms.getMaintenanceByUsername(this.userValue.username).subscribe((m) => {
        if (m !== null) {
          this.ms.completeMaintenance({
            serviceId: m.serviceId,
            maintenaceId: m.maintenaceId,
            actualEndTime: new Date(),
            finishedMessage: this.registerForm.value.finishedMessage,
            status: 'Completed'
          } as Maintenance).subscribe((res) => {
            if (res.success) {
              this.router.navigate(['/staff/maintenance-list']);
              alert('Good!');
            }
          });
        }
      });
    };
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

  get f() { return this.registerForm.controls; }

}
