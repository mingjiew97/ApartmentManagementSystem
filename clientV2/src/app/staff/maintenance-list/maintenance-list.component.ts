import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';
import {AuthService} from '../../services/auth.service';
import {Service} from '../../modules/Service';
import {MaintenanceService} from '../../services/maintenance.service';
import {Maintenance} from '../../modules/Maintenance';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {

  displayedColumns: string[] = ['status', 'roomNumber', 'preferableStartTime', 'preferableEndTime', 'information', 'operations'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  userValue;
  serviceList;
  postServiceList = [];
  progressServiceList = [];
  completedServiceList = [];
  dataSource;
  serviceStatus = 'all';

  constructor(
    private router: Router,
    private ss: UserServiceService,
    private as: AuthService,
    private ms: MaintenanceService
  ) { }

  ngOnInit() {
    this.as.userSubject.subscribe((user) => {
      this.userValue = user;
    });

    this.ss.getAllServices().subscribe((res) => {
      this.serviceList = res;
      for (let i = 0; i < res.length; i++) {
        this.serviceList[i].preferableStartTimeString = new Date(res[i].preferableStartTime).toLocaleString();
        this.serviceList[i].preferableEndTimeString = new Date(res[i].preferableEndTime).toLocaleString();
        if (this.serviceList[i].status === 'Posted') {
          this.postServiceList.push(this.serviceList[i]);
        } else if (this.serviceList[i].status === 'In Progress') {
          this.progressServiceList.push(this.serviceList[i]);
        } else if (this.serviceList[i].status === 'Completed') {
          this.completedServiceList.push(this.serviceList[i]);
        }
      }
      if (this.serviceStatus === 'all') {
        this.dataSource = new MatTableDataSource<any>(this.serviceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.postServiceList.length = 0;
        this.progressServiceList.length = 0;
        this.completedServiceList.length = 0;
      } else if (this.serviceStatus === 'post') {
        this.dataSource = new MatTableDataSource<any>(this.postServiceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.postServiceList.length = 0;
        this.progressServiceList.length = 0;
        this.completedServiceList.length = 0;
      } else if (this.serviceStatus === 'inProgress') {
        this.dataSource = new MatTableDataSource<any>(this.progressServiceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.postServiceList.length = 0;
        this.progressServiceList.length = 0;
        this.completedServiceList.length = 0;
      } else if (this.serviceStatus === 'completed') {
        this.dataSource = new MatTableDataSource<any>(this.completedServiceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.postServiceList.length = 0;
        this.progressServiceList.length = 0;
        this.completedServiceList.length = 0;
      }
    });
  }

  begin(newService: Service) {
    this.ms.checkStaffMaintenanceAmount(this.userValue.username).subscribe((res) => {
      if (res.success) {
        this.ms.createNewMaintenance({
          actualStartTime: new Date(),
          staffName: this.userValue.username,
          status: 'In Progress',
          serviceId: newService.serviceId
        } as Maintenance).subscribe((res2) => {
          if (res2.success) {
            this.ms.getMaintenanceByServiceId(newService.serviceId).subscribe((res3) => {
              if (res3 !== null) {
                newService.maintenanceId = res3.maintenaceId;
                this.ss.editServiceByStaff(newService).subscribe((res4) => {
                  if (res4.success) {
                    this.ngOnInit();
                    alert('You have started a maintenance!');
                    this.router.navigate(['/staff/my-maintenance-list']);
                  } else {
                    alert('Bad!');
                  }
                });
              }
            });
          } else {
            alert('Maintenance Creation failed!!');
            return;
          }
        });
      } else {
        alert('You have other maintenance in progress. Please finish it first!!');
        return;
      }
    });
  }

  // complete(newService: Service) {
  //   this.ms.getMaintenanceByServiceId(newService.serviceId).subscribe((res0) => {
  //     this.router.navigate([]);
  //   });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
