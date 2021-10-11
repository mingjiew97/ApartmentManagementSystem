import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';
import {AuthService} from '../../services/auth.service';
import {Service} from '../../modules/Service';
import {DomSanitizer} from '@angular/platform-browser';
import {MaintenanceService} from '../../services/maintenance.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  postDisplayedColumns: string[] = ['status', 'preferableStartTime', 'preferableEndTime', 'information', 'actualStartTime', 'actualEndTime', 'staffUsername', 'finalMessage', 'operations'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  userValue;
  maintenanceList;
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
  ) {}

  ngOnInit() {
    this.as.userSubject.subscribe((user) => {
      this.userValue = user;
      if (user !== null) {
        this.ms.getAllMaintenance().subscribe((m) => {
          if (m !== null) {
            this.maintenanceList = m;
            if (this.maintenanceList !== null) {
              this.ss.getServices(this.userValue.roomNumber).subscribe((res) => {
                this.serviceList = res;
                this.postServiceList.length = 0; this.progressServiceList.length = 0; this.completedServiceList.length = 0;
                for (let i = 0; i < this.serviceList.length; i++) {
                  this.serviceList[i].actualStartTime = 'Not Available';
                  this.serviceList[i].actualEndTime = 'Not Available';
                  this.serviceList[i].staffUsername = 'Not Available';
                  this.serviceList[i].finalMessage = 'Not Available';
                  for (let j = 0; j < this.maintenanceList.length; j++) {
                    if (this.maintenanceList[j].serviceId === this.serviceList[i].serviceId) {
                      if (this.maintenanceList[j].actualStartTime !== null) {
                        this.serviceList[i].actualStartTime = new Date(this.maintenanceList[j].actualStartTime).toLocaleString();
                      }
                      if (this.maintenanceList[j].actualEndTime !== null) {
                        this.serviceList[i].actualEndTime = new Date(this.maintenanceList[j].actualEndTime).toLocaleString();
                      }
                      if (this.maintenanceList[j].staffName !== null) {
                        this.serviceList[i].staffUsername = this.maintenanceList[j].staffName;
                      }
                      if (this.maintenanceList[j].finishedMessage !== null) {
                        this.serviceList[i].finalMessage = this.maintenanceList[j].finishedMessage;
                      }
                    }
                  }
                  this.serviceList[i].preferableStartTime = new Date(res[i].preferableStartTime).toLocaleString();
                  this.serviceList[i].preferableEndTime = new Date(res[i].preferableEndTime).toLocaleString();
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
                } else if (this.serviceStatus === 'post') {
                  this.dataSource = new MatTableDataSource<any>(this.postServiceList);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                } else if (this.serviceStatus === 'inProgress') {
                  this.dataSource = new MatTableDataSource<any>(this.progressServiceList);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                } else if (this.serviceStatus === 'completed') {
                  this.dataSource = new MatTableDataSource<any>(this.completedServiceList);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }
              });
            }
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editService(service: Service) {
    if (service.status === 'In Progress') {
      alert('Service in Progress, can not edit!');
      return;
    }
    localStorage.setItem('serviceId', (service.serviceId).toString());
    this.router.navigate(['/users/edit-service']);
  }

  cancelService(service: Service) {
    if (service.status === 'In Progress') {
      alert('Service in Progress, can not delete!');
      return;
    }
    this.ss.deleteService(service.serviceId).subscribe((res) => {
      if (res.success) {
        alert('Service has been deleted successfully!');
        this.ngOnInit();
      } else {
        alert('Bad things happened. Nothing was deleted!');
      }
    });
  }
}
