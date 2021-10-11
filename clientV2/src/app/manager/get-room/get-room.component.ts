import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from '../../modules/Room';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {LeaseService} from '../../services/lease.service';

@Component({
  selector: 'app-get-room',
  templateUrl: './get-room.component.html',
  styleUrls: ['./get-room.component.scss']
})
export class GetRoomComponent implements OnInit {
  displayedColumns: string[] = ['roomNumber', 'roomType', 'roomArea', 'status', 'rent', 'deposit', 'remainedBalance', 'leaseEndDate', 'operations'];
  rooms = null;
  bookedRoom = [];
  vacantRoom = [];
  unpaidRoom = [];
  lease = null;
  sortedData;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource;
  roomStatus = 'all';

  constructor(
    public rs: RoomService,
    public ls: LeaseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.rs.getAllRoom().subscribe((res) => {
      this.rooms = res;
      if (this.rooms !== null) {
        for (let i = 0; i < this.rooms.length; i++) {
          this.ls.getLeaseByRoomNumber(this.rooms[i].roomNumber).subscribe((lease) => {
            if (lease == null) {
              this.rooms[i].rent = this.rooms[i].deposit;
              this.rooms[i].leaseEndDate = null;
            } else {
              this.rooms[i].rent = lease.rent;
              this.rooms[i].deposit = lease.deposit;
              this.rooms[i].leaseId = lease.leaseId;
              this.rooms[i].leaseEndDate = new Date(lease.leaseEndDate).toLocaleString();
            }
            if (this.rooms[i].status === 'Vacant') {
              this.vacantRoom.push(this.rooms[i]);
            } else if ((this.rooms[i].status === 'Booked') || (this.rooms[i].status === 'Occupied')) {
              this.bookedRoom.push(this.rooms[i]);
            }
            if (this.rooms[i].remainedBalance !== 0) {
              this.unpaidRoom.push(this.rooms[i]);
            }
          });
        }
        if (this.roomStatus === 'all') {
          this.dataSource = new MatTableDataSource<any>(this.rooms);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.bookedRoom.length = 0;
          this.vacantRoom.length = 0;
          this.unpaidRoom.length = 0;
        } else if (this.roomStatus === 'vacant') {
          this.dataSource = new MatTableDataSource<any>(this.vacantRoom);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.bookedRoom.length = 0;
          this.vacantRoom.length = 0;
          this.unpaidRoom.length = 0;
        } else if (this.roomStatus === 'bookedOrOccupied') {
          this.dataSource = new MatTableDataSource<any>(this.bookedRoom);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.bookedRoom.length = 0;
          this.vacantRoom.length = 0;
          this.unpaidRoom.length = 0;
        } else if (this.roomStatus === 'unPaid') {
          this.dataSource = new MatTableDataSource<any>(this.unpaidRoom);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.bookedRoom.length = 0;
          this.vacantRoom.length = 0;
          this.unpaidRoom.length = 0;
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.rooms.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'roomNumber': return compareRoomNumber(a.roomNumber, b.roomNumber, isAsc);
        case 'roomArea': return compare(a.roomArea, b.roomArea, isAsc);
        case 'rent': return compareRentDeposit(a.rent, b.rent, isAsc);
        case 'deposit': return compareRentDeposit(a.deposit, b.deposit, isAsc);
        case 'remainedBalance': return compare(a.remainedBalance, b.remainedBalance, isAsc);
      }
    });
  }

  editRoom(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['/manager/edit-room']);
  }

  editLease(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['/manager/edit-lease']);
  }

  leaseInfo(roomNumber: string) {
    localStorage.setItem('roomNumber', roomNumber);
    this.router.navigate(['users/lease-info']);
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
            this.rs.changeRoomBalance({roomNumber: room.roomNumber, remainedBalance: 0} as Room).subscribe((res3) => {
              if (res3.success) {
                this.ngOnInit();
                alert('Successfully Deleted!!');
              } else {
                alert('Bad!');
              }
            });
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


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareRoomNumber(a: string, b: string, isAsc: boolean) {
  const floorA = parseInt(a, 10);
  const roomIndexA = a.substr(a.length - 1);
  const floorB = parseInt(b, 10);
  const roomIndexB = b.substr(b.length - 1);

  if (floorA === floorB) {
    return (roomIndexA < roomIndexB ? -1 : 1) * (isAsc ? 1 : -1);
  } else {
    return (floorA < floorB ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

function compareRentDeposit(a: number | string, b: number | string, isAsc: boolean) {
  let tempA = a;
  let tempB = b;
  if (tempA === null && !isAsc) {
    tempA = 0;
  } else if (tempA === null && isAsc) {
    tempA = 999999999999999;
  }
  if (tempB === null && !isAsc) {
    tempB = 0;
  } else if (tempB === null && isAsc) {
    tempB = 999999999999999;
  }
  return (tempA < tempB ? -1 : 1) * (isAsc ? 1 : -1);
}
