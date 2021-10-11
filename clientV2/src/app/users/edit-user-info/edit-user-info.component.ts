import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../modules/User';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss']
})
export class EditUserInfoComponent implements OnInit {

  Titles: any = ['Mr.', 'Ms.', 'Mrs.', 'Miss '];
  submitted = false;
  registerForm: FormGroup;
  userValue = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required]
    });

    this.as.userSubject.subscribe((res) => {
      this.userValue = res;
    //  set value -> registerForm initial value
      if (this.userValue !== null) {
        this.registerForm.controls.username.setValue(this.userValue.username);
        this.registerForm.controls.firstName.setValue(this.userValue.firstName);
        this.registerForm.controls.lastName.setValue(this.userValue.lastName);
        this.registerForm.controls.title.setValue(this.userValue.title);
      }
    });
  }

  get f() { return this.registerForm.controls; }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

  onSubmit() {
    console.log(this.registerForm);
    // change form submitted
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.as.editUserInformation(this.registerForm.value as User)
      .subscribe(res => {
        if (res.success) {
          alert('You have successfully updated your information!!');
          this.as.checkLogin();
          this.router.navigate(['/users/user-info']);
        } else {
          alert('Something wrong happens. We cannot update your information currently!');
        }
      });
  }
}
