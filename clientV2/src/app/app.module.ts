import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxAvatarModule, IgxButtonModule, IgxDividerModule, IgxDropDownModule,
  IgxIconModule,
  IgxLayoutModule, IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxRadioModule, IgxRippleModule,
  IgxSwitchModule, IgxToggleModule
} from 'igniteui-angular';
import {ButtonsModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';
import { FooterComponent } from './commons/footer/footer.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UserHomeComponent } from './users/user-home/user-home.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import {AngularMaterialModule} from './modules/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatCheckboxModule, MatProgressBarModule, MatSortModule, MatStepperModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { HelpComponent } from './commons/help/help.component';
import { EditUserInfoComponent } from './users/edit-user-info/edit-user-info.component';
import { ChangeEmailComponent } from './users/change-email/change-email.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CreateLeaseComponent } from './manager/create-lease/create-lease.component';
import { EditLeaseComponent } from './manager/edit-lease/edit-lease.component';
import { CreateRoomComponent } from './manager/create-room/create-room.component';
import { EditRoomComponent } from './manager/edit-room/edit-room.component';
import { RoomInfoComponent } from './manager/room-info/room-info.component';
import { GetRoomComponent } from './manager/get-room/get-room.component';
import { SearchRoomComponent } from './manager/search-room/search-room.component';
import { GetSearchedRoomComponent } from './manager/get-searched-room/get-searched-room.component';
import { CancelLeaseComponent } from './manager/cancel-lease/cancel-lease.component';
import { LeaseInfoComponent } from './manager/lease-info/lease-info.component';
import { ScheduleServiceComponent } from './users/schedule-service/schedule-service.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ServiceListComponent } from './users/service-list/service-list.component';
import { EditServiceComponent } from './users/edit-service/edit-service.component';
import { MaintenanceListComponent } from './staff/maintenance-list/maintenance-list.component';
import { MyMaintenanceComponent } from './staff/my-maintenance/my-maintenance.component';
import { CompleteMyMaintenanceComponent } from './staff/complete-my-maintenance/complete-my-maintenance.component';
import { PayRentComponent } from './users/payment/pay-rent/pay-rent.component';
import { BankAccountComponent } from './users/payment/bank-account/bank-account.component';
import { PaymentHomeComponent } from './users/payment/payment-home/payment-home.component';
import { PostPackageComponent } from './staff/post-package/post-package.component';
import { GetPackageComponent } from './users/get-package/get-package.component';
import { FileUploadComponent } from './test/file-upload/file-upload.component';
import {StripeDemoComponent} from './users/payment/stripe-demo/stripe-demo.component';
import { BackgroundComponent } from './test/background/background.component';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { MoveInMoveOutComponent } from './users/move-in-move-out/move-in-move-out.component';
import { MyMoveinMoveoutComponent } from './users/my-movein-moveout/my-movein-moveout.component';
import { AllMoveinMoveoutComponent } from './staff/all-movein-moveout/all-movein-moveout.component';
import { ApartmentInformationComponent } from './apartment-information/apartment-information.component';
import { FaqComponent } from './faq/faq.component';
import {MatFaqModule} from '@angular-material-extensions/faq';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {CountoModule} from 'angular2-counto';
import { RentCollectionComponent } from './manager/rent-collection/rent-collection.component';
import {ChartsModule} from 'ng2-charts';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    UserInfoComponent,
    HelpComponent,
    EditUserInfoComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    CreateLeaseComponent,
    EditLeaseComponent,
    CreateRoomComponent,
    EditRoomComponent,
    RoomInfoComponent,
    GetRoomComponent,
    SearchRoomComponent,
    GetSearchedRoomComponent,
    CancelLeaseComponent,
    LeaseInfoComponent,
    ScheduleServiceComponent,
    ServiceListComponent,
    EditServiceComponent,
    MaintenanceListComponent,
    MyMaintenanceComponent,
    CompleteMyMaintenanceComponent,
    PayRentComponent,
    BankAccountComponent,
    PaymentHomeComponent,
    PostPackageComponent,
    GetPackageComponent,
    FileUploadComponent,
    StripeDemoComponent,
    BackgroundComponent,
    MoveInMoveOutComponent,
    MyMoveinMoveoutComponent,
    AllMoveinMoveoutComponent,
    ApartmentInformationComponent,
    FaqComponent,
    RentCollectionComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BootStrap
    NgbModule,
    // change image shape
    IgxAvatarModule,
    BrowserAnimationsModule,
    // nav-bar
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    // angular material
    BrowserAnimationsModule,
    AngularMaterialModule,
    // flex layout
    FlexLayoutModule,
    // angular form
    FormsModule,
    ReactiveFormsModule,
    // http module, for back end communication
    HttpClientModule,
    MatSortModule,
    // Timer Module
    NgxMaterialTimepickerModule,
    IgxSwitchModule,
    IgxIconModule,
    IgxNavigationDrawerModule,
    IgxRadioModule,
    IgxLayoutModule,
    IgxButtonModule,
    IgxToggleModule,
    IgxRippleModule,
    IgxNavbarModule,
    IgxDropDownModule,
    IgxDividerModule,
    MatStepperModule,
    MatProgressBarModule,
    MatCheckboxModule,
    SchedulerModule,
    MatFaqModule.forRoot(),
    CountoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
