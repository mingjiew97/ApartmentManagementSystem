import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';
import {AuthService} from '../../services/auth.service';
import {MaintenanceService} from '../../services/maintenance.service';
import {MoveinMoveoutService} from '../../services/movein-moveout.service';

@Component({
  selector: 'app-all-movein-moveout',
  templateUrl: './all-movein-moveout.component.html',
  styleUrls: ['./all-movein-moveout.component.scss']
})
export class AllMoveinMoveoutComponent implements OnInit {

  displayedColumns: string[] = ['type', 'status', 'startTime', 'endTime', 'operations'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  userValue = null;
  allList = [];
  pendingList = [];
  deniedList = [];
  approvedList = [];
  dataSource;
  selectedStatus = 'pending';

  constructor(
    public router: Router,
    public as: AuthService,
    public ms: MoveinMoveoutService
  ) { }

  ngOnInit() {
    this.ms.getAllMoveInMoveOut().subscribe((res) => {
      if (res !== null) {
        this.allList = res;
        this.pendingList.length = 0; this.deniedList.length = 0; this.approvedList.length = 0;
        for (let i = 0; i < res.length; i++) {
          this.allList[i].startTime = new Date(res[i].startTime).toLocaleString();
          this.allList[i].endTime = new Date(res[i].endTime).toLocaleString();
          if (res[i].approved === 'Pending') {
            this.pendingList.push(this.allList[i]);
          } else if (res[i].approved === 'Denied') {
            this.deniedList.push(this.allList[i]);
          } else if (res[i].approved === 'Approved') {
            this.approvedList.push(this.allList[i]);
          }
        }
        if (this.selectedStatus === 'pending') {
          this.dataSource = new MatTableDataSource<any>(this.pendingList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else if (this.selectedStatus === 'denied') {
          this.dataSource = new MatTableDataSource<any>(this.deniedList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else if (this.selectedStatus === 'approved') {
          this.dataSource = new MatTableDataSource<any>(this.approvedList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else if (this.selectedStatus === 'all') {
          this.dataSource = new MatTableDataSource<any>(this.allList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  approve(l) {
    this.ms.changeStatus({liftScheduleId: l.liftScheduleId, approved: 'Approved'}).subscribe((res) => {
      if (res.success) {
        alert('Approved!');
        this.ngOnInit();
      } else {
        alert('Bad!');
      }
    });
  }

  deny(l) {
    this.ms.changeStatus({liftScheduleId: l.liftScheduleId, approved: 'Denied'}).subscribe((res) => {
      if (res.success) {
        alert('Denied!');
        this.ngOnInit();
      } else {
        alert('Bad!');
      }
    });
  }

  delete(l) {
    this.ms.deleteById(l.liftScheduleId).subscribe((res) => {
      if (res.success) {
        alert('Deleted!');
        this.ngOnInit();
      } else {
        alert('Bad!');
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
