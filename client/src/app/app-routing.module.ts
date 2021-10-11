import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {HelpComponent} from './commons/help/help.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {PaymentComponent} from './payment/payment.component';
import {LogoutComponent} from './users/logout/logout.component';
import {UserInfoComponent} from './users/user-info/user-info.component';

const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    children: [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  }
    ]
  },
  {
    path: 'commons',
    children: [
      {
        path: 'help',
        component: HelpComponent
      }
    ]
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
