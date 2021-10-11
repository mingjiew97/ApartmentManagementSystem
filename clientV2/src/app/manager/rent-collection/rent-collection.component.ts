import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {LeaseService} from '../../services/lease.service';
import {max} from 'rxjs/operators';
import {log} from 'util';

@Component({
  selector: 'app-rent-collection',
  templateUrl: './rent-collection.component.html',
  styleUrls: ['./rent-collection.component.scss']
})
export class RentCollectionComponent implements OnInit {

  allRoom = [];
  totalRent = 0;
  unPaidRent = 0;
  allLease = []
  fullyPaidRooms = [];
  unPaidRooms = [];
  hover = false;

  constructor(
    public rs: RoomService,
    public ls: LeaseService
  ) { }

  ngOnInit() {
    this.unPaidRooms.length = 0;
    this.fullyPaidRooms.length = 0;
    this.allRoom.length = 0;
    this.totalRent = 0;
    this.unPaidRent = 0;
    this.rs.getAllRoom().subscribe((rooms) => {
      if (rooms.length !== 0) {
        this.allRoom = rooms;
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].remainedBalance === 0) {
            this.fullyPaidRooms.push(rooms[i].roomNumber);
          } else if (rooms[i].remainedBalance !== 0) {
            this.unPaidRooms.push(rooms[i].roomNumber);
          }
          this.unPaidRent += rooms[i].remainedBalance;
          this.ls.getLeaseByRoomNumber(rooms[i].roomNumber).subscribe((l) => {
            if (l !== null) {
              this.totalRent += l.deposit;
              this.totalRent += l.rent;
              this.chartDatasets = [{ data: [this.totalRent - this.unPaidRent, this.unPaidRent], label: 'My First dataset' }];
            }
          });
        }
      }
    });
  }

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = null;

  public chartLabels: Array<any> = [this.fullyPaidRooms, this.unPaidRooms];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#46BFBD', '#F7464A', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#5AD3D1', '#FF5A5E', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void {}

  addPenalty() {
    for (let i = 0; i < this.unPaidRooms.length; i++) {
      this.rs.getRoomByRoomNumber(this.unPaidRooms[i]).subscribe((r) => {
        if (r !== null) {
          this.rs.changeRoomBalance({
            roomNumber: r.roomNumber,
            remainedBalance: (r.remainedBalance + 50)
          }).subscribe((res) => {
            if (res.success) {
              console.log('Good!');
            }
          });
        }
      });
    }
    alert('Penalty Fee has been added!');
  }
}
