import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../modules/User';
import {AuthService} from '../../services/auth.service';
import {HeaderComponent} from '../../commons/header/header.component';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Renter', 'Staff', 'Manager'];
  Titles: any = ['Mr.', 'Ms.', 'Mrs.', 'Miss '];
  submitted = false;
  registerForm: FormGroup;
  rooms = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
    private rs: RoomService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', [Validators.required, this.validateConfirmPassword]],
      userType: ['', Validators.required],
      roomNumber: ['', Validators.required],
      title: ['', Validators.required],
      // img: ['']
    });
    this.registerForm.controls.roomNumber.setValue(' ');

    this.rs.getAllRoom().subscribe((res) => {
      this.rooms = res;
    });
  }

  // validateConfirmPassword(c: FormControl) {
  //   console.log(this.registerForm);
  //   if (this.registerForm !== null) {
  //     if (this.registerForm.value.password !== c.value) {
  //       return {
  //         validateConfirmPassword: {
  //           valid: false
  //         }
  //       };
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // change form submitted
    this.submitted = true;
    if (this.registerForm.value.userType !== 'Renter') {
      this.registerForm.controls.roomNumber.setValue(null);
    } else {
      const temp = this.registerForm.value.roomNumber.replace(/\s/g, '');
      let tempCheck = false;
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNumber === temp) {
          tempCheck = true;
          break;
        }
      }
      if (!tempCheck) {
        alert('The Room does not exist! Please check your input information and try again!!');
        return;
      }
      this.registerForm.controls.roomNumber.setValue(temp);
    }
    this.as.register(this.registerForm.value as User)
      .subscribe(res => {
        if (res.containsUser && res.insertUser) {
          alert('You have successfully registered, please use your email and password to log in!');
          this.router.navigate(['/users/login']);
        } else if (!res.containsUser) {
          alert('User with same email address has already being registered');
        } else if (!res.insertUser) {
          alert('User registration failed');
        } else {
          alert('Registration Failed');
        }
      });
  }
  //
  // handleFileInput(files: FileList) {
  //   console.log(files.item(0));
  // }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
