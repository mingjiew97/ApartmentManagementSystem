import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {LeaseService} from '../../services/lease.service';
import {Room} from '../../modules/Room';

@Component({
  selector: 'app-get-searched-room',
  templateUrl: './get-searched-room.component.html',
  styleUrls: ['./get-searched-room.component.scss']
})
export class GetSearchedRoomComponent implements OnInit {
  displayedColumns: string[] = ['roomNumber', 'roomType', 'roomArea', 'status', 'rent', 'deposit', 'operations'];
  rooms = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource;

  constructor(
    public rs: RoomService,
    public router: Router,
    public ls: LeaseService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('roomTypeCheck') === 'true') {
      const roomTypeValue = localStorage.getItem('roomType');
      this.rs.getRoomByRoomType(roomTypeValue).subscribe(res => {
        this.rooms = res;
        for (let i = 0; i < this.rooms.length; i++) {
          this.ls.getLeaseByRoomNumber(this.rooms[i].roomNumber).subscribe((lease) => {
            if (lease == null) {
              this.rooms[i].rent = this.rooms[i].deposit;
            } else {
              this.rooms[i].rent = lease.rent;
              this.rooms[i].deposit = lease.deposit;
            }
          });
        }
        this.dataSource = new MatTableDataSource<any>(this.rooms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else if (localStorage.getItem('roomStatusCheck') === 'true') {
      const roomStatusValue = localStorage.getItem('roomStatus');
      this.rs.getRoomByRoomStatus(roomStatusValue).subscribe(res => {
        this.rooms = res;
        for (let i = 0; i < this.rooms.length; i++) {
          this.ls.getLeaseByRoomNumber(this.rooms[i].roomNumber).subscribe((lease) => {
            if (lease == null) {
              this.rooms[i].rent = this.rooms[i].deposit;
            } else {
              this.rooms[i].rent = lease.rent;
              this.rooms[i].deposit = lease.deposit;
            }
          });
        }
        this.dataSource = new MatTableDataSource<any>(this.rooms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRoom(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['/manager/edit-room']);
  }

  editLease(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['/manager/edit-lease']);
  }

  createLease(roomNumber: string) {
    localStorage.setItem('createLeaseRoomNumber', roomNumber);
    this.router.navigate(['/manager/create-lease']);
  }

  roomInfo(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['/manager/room-info']);
  }

  cancelLease(leaseId: string, room: Room) {
    this.ls.deleteLeaseByLeaseId(leaseId).subscribe((res) => {
      if (res.success) {
        this.rs.deleteLease(room).subscribe((res2) => {
          if (res2.success) {
            this.ngOnInit();
            alert('Successfully Deleted!!');
            return;
          } else {
            alert('Something bad happens during the deletion process!');
            return;
          }
        });
      } else {
        alert('Something bad happens during the deletion process!');
      }
    });
  }
}
