import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {RegisterLoginDataSharingService} from '../../services/register-login-data-sharing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  message: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
    private rldss: RegisterLoginDataSharingService
  ) { }

  ngOnInit() {
    this.rldss.currentMessage.subscribe(message => this.message = message);

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roomNumber: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log('firstName is ' + this.registerForm.value.firstName);
    console.log('lastName is ' + this.registerForm.value.lastName);
    console.log('email is ' + this.registerForm.value.username);
    console.log('password is ' + this.registerForm.value.password);
    console.log('roomNumber is ' + this.registerForm.value.roomNumber);
    console.log('Title is ' + this.registerForm.value.title);

    this.as.register(this.registerForm.value as User)
      .subscribe(res => {
        console.log(res);
        if (res.containsUser && res.insertUser) {
          this.rldss.changeMessage(this.registerForm.value.username);
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

}
