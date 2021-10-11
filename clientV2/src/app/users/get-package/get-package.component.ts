import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {PackageService} from '../../services/package.service';
import {Package} from '../../modules/Package';
import {HeaderComponent} from '../../commons/header/header.component';

@Component({
  selector: 'app-get-package',
  templateUrl: './get-package.component.html',
  styleUrls: ['./get-package.component.scss']
})
export class GetPackageComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  packageStatus = 'arrived';
  dataSource;
  userValue = null;
  arrivedPackages = [];
  pickedPackages = [];
  allPackages = [];
  postDisplayedColumns = [];
  renterDisplayedColumns = ['Arrived Time', 'Tracking Number', 'Status', 'Picked Time', 'Operations'];
  staffDisplayedColumns = ['Tracking Number', 'roomNumber', 'name', 'Status', 'Operations'];

  constructor(
    private router: Router,
    private as: AuthService,
    private ps: PackageService,
    private h: HeaderComponent,
  ) { }

  ngOnInit() {
    this.as.userSubject.subscribe((user) => {
      if (user !== null) {
        this.userValue = user;
        if (user.userType === 'Renter') {
          this.postDisplayedColumns = this.renterDisplayedColumns;
          this.ps.getPackageByUsername(this.userValue.username).subscribe((p) => {
            if (p !== null) {
              this.arrivedPackages.length = 0; this.pickedPackages.length = 0;
              this.allPackages = p;
              for (let i = 0; i < this.allPackages.length; i++) {
                const temp = this.allPackages[i].packageArrivalTime;
                this.allPackages[i].packageArrivalTime = new Date(temp).toLocaleString();
                if (this.allPackages[i].status === 'Arrived') {
                  this.allPackages[i].packagePickedUpTime = 'Not Available';
                  this.arrivedPackages.push(this.allPackages[i]);
                } else if (this.allPackages[i].status === 'Picked') {
                  const temp2 = this.allPackages[i].packagePickedUpTime;
                  this.allPackages[i].packagePickedUpTime = new Date(temp2).toLocaleString();
                  this.pickedPackages.push(this.allPackages[i]);
                }
              }
              if (this.packageStatus === 'all') {
                this.dataSource = new MatTableDataSource<any>(this.allPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else if (this.packageStatus === 'arrived') {
                this.dataSource = new MatTableDataSource<any>(this.arrivedPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else if (this.packageStatus === 'picked') {
                this.dataSource = new MatTableDataSource<any>(this.pickedPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            }
          });
        } else if (user.userType === 'Staff') {
          this.postDisplayedColumns = this.staffDisplayedColumns;
          this.ps.getAllPackages().subscribe((packages) => {
            this.arrivedPackages.length = 0; this.pickedPackages.length = 0;
            if (packages !== null) {
              this.allPackages = packages;
              for (let i = 0; i < this.allPackages.length; i++) {
                this.allPackages[i].packageArrivalTime = new Date(packages[i].packageArrivalTime).toLocaleString();
                this.as.getUserById(this.allPackages[i].renterId).subscribe((u) => {
                  if (u !== null) {
                    this.allPackages[i].roomNumber = u.roomNumber;
                    this.allPackages[i].name = u.firstName + ' ' + u.lastName;
                    if (this.allPackages[i].status === 'Arrived') {
                      this.allPackages[i].packagePickedUpTime = 'Not Available';
                    } else if (this.allPackages[i].status === 'Picked') {
                      const temp2 = this.allPackages[i].packagePickedUpTime;
                      this.allPackages[i].packagePickedUpTime = new Date(temp2).toLocaleString();
                    }
                  }
                });
              }
              for (let i = 0; i < this.allPackages.length; i++) {
                if (this.allPackages[i].status === 'Arrived') {
                  this.arrivedPackages.push(this.allPackages[i]);
                } else if (this.allPackages[i].status === 'Picked') {
                  this.pickedPackages.push(this.allPackages[i]);
                }
              }
              if (this.packageStatus === 'all') {
                this.dataSource = new MatTableDataSource<any>(this.allPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else if (this.packageStatus === 'arrived') {
                this.dataSource = new MatTableDataSource<any>(this.arrivedPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else if (this.packageStatus === 'picked') {
                this.dataSource = new MatTableDataSource<any>(this.pickedPackages);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            }
          });
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pick(p: Package) {
    p.status = 'Picked';
    p.packagePickedUpTime = new Date();
    p.packageArrivalTime = new Date(p.packageArrivalTime);
    this.ps.editPackage(p).subscribe((res) => {
      if (res.success) {
        this.h.ngOnInit();
        this.ngOnInit();
        alert('Good!');
      } else {
        alert('Bad!');
      }
    });
  }

  delete(p: Package) {
    this.ps.deletePackageById(p.id).subscribe((res) => {
      if (res.success) {
        alert('Good!');
        this.ngOnInit();
      } else {
        alert('Bad!');
      }
    });
  }
}
