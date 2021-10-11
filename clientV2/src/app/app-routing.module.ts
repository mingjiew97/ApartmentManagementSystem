import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserHomeComponent} from './users/user-home/user-home.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {UserInfoComponent} from './users/user-info/user-info.component';
import {HelpComponent} from './commons/help/help.component';
import {EditUserInfoComponent} from './users/edit-user-info/edit-user-info.component';
import {ChangeEmailComponent} from './users/change-email/change-email.component';
import {ChangePasswordComponent} from './users/change-password/change-password.component';
import {CreateLeaseComponent} from './manager/create-lease/create-lease.component';
import {EditLeaseComponent} from './manager/edit-lease/edit-lease.component';
import {CreateRoomComponent} from './manager/create-room/create-room.component';
import {EditRoomComponent} from './manager/edit-room/edit-room.component';
import {RoomInfoComponent} from './manager/room-info/room-info.component';
import {GetRoomComponent} from './manager/get-room/get-room.component';
import {SearchRoomComponent} from './manager/search-room/search-room.component';
import {GetSearchedRoomComponent} from './manager/get-searched-room/get-searched-room.component';
import {CancelLeaseComponent} from './manager/cancel-lease/cancel-lease.component';
import {LeaseInfoComponent} from './manager/lease-info/lease-info.component';
import {ScheduleServiceComponent} from './users/schedule-service/schedule-service.component';
import {ServiceListComponent} from './users/service-list/service-list.component';
import {EditServiceComponent} from './users/edit-service/edit-service.component';
import {Maintenance} from './modules/Maintenance';
import {MaintenanceListComponent} from './staff/maintenance-list/maintenance-list.component';
import {MyMaintenanceComponent} from './staff/my-maintenance/my-maintenance.component';
import {CompleteMyMaintenanceComponent} from './staff/complete-my-maintenance/complete-my-maintenance.component';
import {PayRentComponent} from './users/payment/pay-rent/pay-rent.component';
import {PaymentHomeComponent} from './users/payment/payment-home/payment-home.component';
import {PostPackageComponent} from './staff/post-package/post-package.component';
import {GetPackageComponent} from './users/get-package/get-package.component';
import {FileUploadComponent} from './test/file-upload/file-upload.component';
import {StripeDemoComponent} from './users/payment/stripe-demo/stripe-demo.component';
import {BackgroundComponent} from './test/background/background.component';
import {MoveInMoveOutComponent} from './users/move-in-move-out/move-in-move-out.component';
import {MyMoveinMoveoutComponent} from './users/my-movein-moveout/my-movein-moveout.component';
import {AllMoveinMoveoutComponent} from './staff/all-movein-moveout/all-movein-moveout.component';
import {ApartmentInformationComponent} from './apartment-information/apartment-information.component';
import {FaqComponent} from './faq/faq.component';
import {RentCollectionComponent} from './manager/rent-collection/rent-collection.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {BankAccountComponent} from './users/payment/bank-account/bank-account.component';


const routes: Routes = [
  {
    path: 'home',
    component: UserHomeComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'apartment-information',
    component: ApartmentInformationComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'manager',
    children: [
      {
        path: 'create-lease',
        component: CreateLeaseComponent
      },
      {
        path: 'edit-lease',
        component: EditLeaseComponent
      },
      {
        path: 'create-room',
        component: CreateRoomComponent
      },
      {
        path: 'edit-room',
        component: EditRoomComponent
      },
      {
        path: 'room-info',
        component: RoomInfoComponent
      },
      {
        path: 'get-room',
        component: GetRoomComponent
      },
      {
        path: 'search-room',
        component: SearchRoomComponent
      },
      {
        path: 'get-searched-room',
        component: GetSearchedRoomComponent
      },
      {
        path: 'cancel-lease',
        component: CancelLeaseComponent
      },
      {
        path: 'rent-collection',
        component: RentCollectionComponent
      }
    ]
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
      },
      {
        path: 'edit-user-info',
        component: EditUserInfoComponent
      },
      {
        path: 'change-email',
        component: ChangeEmailComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'lease-info',
        component: LeaseInfoComponent
      },
      {
        path: 'schedule-service',
        component: ScheduleServiceComponent
      },
      {
        path: 'service-list',
        component: ServiceListComponent
      },
      {
        path: 'edit-service',
        component: EditServiceComponent
      },
      {
        path: 'pay-rent',
        component: PayRentComponent
      },
      {
        path: 'payment',
        component: PaymentHomeComponent
      },
      {
        path: 'get-package',
        component: GetPackageComponent
      },
      {
        path: 'pay-by-card',
        component: StripeDemoComponent
      },
      {
        path: 'pay-by-bank',
        component: BankAccountComponent
      },
      {
        path: 'movein-moveout',
        component: MoveInMoveOutComponent
      },
      {
        path: 'my-movein-moveout',
        component: MyMoveinMoveoutComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'staff',
    children: [
      {
        path: 'maintenance-list',
        component: MaintenanceListComponent
      },
      {
        path: 'my-maintenance-list',
        component: MyMaintenanceComponent
      },
      {
        path: 'complete-maintenance',
        component: CompleteMyMaintenanceComponent
      },
      {
        path: 'post-package',
        component: PostPackageComponent
      },
      {
        path: 'moveIn-moveOut-list',
        component: AllMoveinMoveoutComponent
      }
    ]
  },
  {
    path: 'test-upload-file',
    component: FileUploadComponent
  },
  {
    path: 'test-background',
    component: BackgroundComponent
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
