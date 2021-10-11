import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterOutlet} from '@angular/router';
import {
  ConnectedPositioningStrategy,
  HorizontalAlignment,
  IgxNavigationDrawerComponent,
  NoOpScrollStrategy,
  VerticalAlignment
} from 'igniteui-angular';
import {PackageService} from '../../services/package.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../modules/User';
import {slideInAnimation} from '../../animations';
import {MoveinMoveoutService} from '../../services/movein-moveout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInAnimation]
})
export class HeaderComponent implements OnInit {
  public overlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom
    }),
    scrollStrategy: new NoOpScrollStrategy()
  };
  public userValue: any;
  public check = false;
  public navItems = [];
  MyMoveInMoveOut = true;
  public userItemsBeforeLogIn = [
    { name: 'account_circle', text: 'Log In', add: '/users/login', check: true },
    { name: 'home', text: 'Apartment Information', add: 'apartment-information', check: true },
    { name: 'feedback', text: 'FAQ', add: '/faq', check: true },
  ];
  public userItemsAfterLogIn = [
    { name: 'account_circle', text: 'My Account', add: '/users/user-info', check: true },
    { name: 'web', text: 'My Lease', add: '/users/lease-info', check: true },
    { name: 'home', text: 'My Room', add: '/manager/room-info', check: true },
    { name: 'all_out', text: 'My Package', add: '/users/get-package', check: true },
    { name: 'menu', text: 'Pay My Rent', add: '/users/payment', check: true },
    { name: 'date_range', text: 'Schedule Service', add: '/users/schedule-service', check: true },
    { name: 'poll', text: 'My Service', add: '/users/service-list', check: true },
    { name: 'date_range', text: 'Schedule Move In / Move Out', add: '/users/movein-moveout', check: true },
    { name: 'poll', text: 'My Move In/Move Out Schedule', add: '/users/my-movein-moveout', check: true },
  ];
  public staffItems = [
    { name: 'account_circle', text: 'My Account', add: '/users/user-info', check: true },
    { name: 'all_out', text: 'Post Package', add: '/staff/post-package', check: true },
    { name: 'list', text: 'Package List', add: '/users/get-package', check: true },
    // { name: 'swap_vert', text: 'Move In / Move Out Schedule', check: true },
    { name: 'list', text: 'Move In / Move out Schedule List', add: '/staff/moveIn-moveOut-list', check: true },
    { name: 'group_work', text: 'My Maintenance', add: '/staff/my-maintenance-list', check: true },
    { name: 'list', text: 'Maintenance List', add: '/staff/maintenance-list', check: true },
  ];
  public managerItems = [
    { name: 'account_circle', text: 'My Account', add: '/users/user-info', check: true },
    { name: 'group_work', text: 'Rent Collection', add: '/manager/rent-collection', check: true },
    { name: 'list', text: 'Room List', add: '/manager/get-room', check: true },
    { name: 'home', text: 'Register Room', add: '/manager/create-room', check: true },
    { name: 'search', text: 'Search Room', add: '/manager/search-room', check: true },
  ];
  public selected = 'Avatar';

  @ViewChild(IgxNavigationDrawerComponent, { static: true })
  public drawer: IgxNavigationDrawerComponent;
  public package = [];
  public unpickedPackage = [];

  public drawerState = {
    miniTemplate: true,
    open: true,
    pin: false
  };

  constructor(
    public as: AuthService,
    public router: Router,
    public ps: PackageService,
    public ms: MoveinMoveoutService
  ) {
    as.checkLogin();
  }

  public navigate(item) {
    // if (item.add === '/users/my-movein-moveout' && this.MyMoveInMoveOut) {
    //   alert('No MoveIn / MoveOut Schedule Currently!');
    //   return;
    // }
    if (item.add !== null) {
      this.ngOnInit();
      this.router.navigate([item.add]);
    }
  }

  public navHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.navItems = this.userItemsBeforeLogIn;
    this.as.userSubject.subscribe((res) => {
      this.userValue = res;
      if (this.userValue !== null) {
        this.check = true;
        if (this.userValue.userType === 'Renter') {
          this.ps.getPackageByUsername(this.userValue.username).subscribe((p) => {
            if (p !== null) {
              this.package = p;
              this.unpickedPackage.length = 0;
              for (let i = 0; i < this.package.length; i++) {
                if (this.package[i].status === 'Arrived') {
                  this.unpickedPackage.push(this.package[i]);
                }
              }
              if (this.unpickedPackage.length > 0) {
                this.userItemsAfterLogIn[3].check = false;
              } else {
                this.userItemsAfterLogIn[3].check = true;
              }
            }
            this.navItems = this.userItemsAfterLogIn;
          });
        } else if (this.userValue.userType === 'Staff') {
          this.navItems = this.staffItems;
        } else if (this.userValue.userType === 'Manager') {
          this.navItems = this.managerItems;
        }
      } else {
        this.navItems = this.userItemsBeforeLogIn;
        this.check = false;
      }
    });

    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.ms.getByRoomNumber(u.roomNumber).subscribe((lss) => {
          if (lss.length === 0) {
            this.MyMoveInMoveOut = false;
          }
        });
      }
    });

  }

  logout() {
    this.as.logout()
      .subscribe((res: {success: true}) => {
        if (res.success) {
          localStorage.clear();
          this.as.userSubject = new BehaviorSubject<User>(null);
          this.ngOnInit();
          alert('log out successfully!!');
          this.router.navigate(['/home']);
          this.as.userSubject.next(null);
        } else {
          alert('can not log out!!');
        }
      });
  }

  getIconURL() {
    if (this.userValue == null) {
      return 'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/pokemon.jpeg';
    } else if (this.userValue.userType === 'Renter') {
      return 'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/humanIcon.jpg';
    } else if (this.userValue.userType === 'Staff') {
      return 'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/hammerIcon.jpg';
    } else if (this.userValue.userType === 'Manager') {
      return 'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/managerIcon.png';
    } else {
      return 'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/pokemon.jpeg';
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
