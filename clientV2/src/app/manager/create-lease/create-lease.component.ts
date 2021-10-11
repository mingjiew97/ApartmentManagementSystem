import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LeaseService} from '../../services/lease.service';
import {RoomService} from '../../services/room.service';
import {Room} from '../../modules/Room';
import {Lease} from '../../modules/Lease';
import {FileService} from '../../services/file.service';
import {MSIFile} from '../../modules/File';

@Component({
  selector: 'app-create-lease',
  templateUrl: './create-lease.component.html',
  styleUrls: ['./create-lease.component.scss']
})
export class CreateLeaseComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  minDate = new Date();
  maxDate = new Date(2025, 1, 1);
  roomNumber: string;
  fileToUpload: File = null;
  employmentLetterForm: FormGroup;
  BankStatementForm: FormGroup;
  taxFromForm: FormGroup;
  photoIdentificationForm: FormGroup;
  leaseCopyForm: FormGroup;
  info = '';

  isLinear = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public ls: LeaseService,
    public rs: RoomService,
    public fs: FileService
  ) { }

  ngOnInit() {
    this.roomNumber = localStorage.getItem('createLeaseRoomNumber');

    this.registerForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      partyA: ['', Validators.required],
      partyB: ['', Validators.required],
      rent: ['', Validators.required],
      deposit: ['', Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required],
    });

    this.employmentLetterForm = this.formBuilder.group({
      employmentLetter: ['', Validators.required]
    });

    this.BankStatementForm = this.formBuilder.group({
      bankStatement: ['', Validators.required]
    });

    this.taxFromForm = this.formBuilder.group({
      taxFrom: ['', Validators.required]
    });

    this.leaseCopyForm = this.formBuilder.group({
      leaseCopy: ['', Validators.required]
    });

    this.photoIdentificationForm = this.formBuilder.group({
      photoIdentification: ['', Validators.required]
    });

    if (this.roomNumber !== null) {
      this.registerForm.controls.roomNumber.setValue(this.roomNumber);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.rs.getRoomByRoomNumber(this.registerForm.value.roomNumber).subscribe((room) => {
      if (room == null) {
        alert('Room ' + this.registerForm.value.roomNumber + ' does not exist!!');
        return;
      } else if (room.leaseId !== 0) {
        alert('Lease on this room exists!!');
        return;
      } else {

        this.ls.createNewLease({
          roomNumber: this.registerForm.value.roomNumber,
          leaseStartDate: this.registerForm.value.leaseStartDate,
          leaseEndDate: this.registerForm.value.leaseEndDate,
          partyA: this.registerForm.value.partyA,
          partyB: this.registerForm.value.partyB,
          rent: this.registerForm.value.rent,
          deposit: this.registerForm.value.deposit,
          employmentLetter: this.employmentLetterForm.value.employmentLetter,
          bankStatement: this.BankStatementForm.value.bankStatement,
          taxFrom: this.taxFromForm.value.taxFrom,
          leaseCopy: this.leaseCopyForm.value.leaseCopy,
          photoIdentification: this.photoIdentificationForm.value.photoIdentification
        } as Lease).subscribe((res) => {
          if (res.success) {
            this.ls.getLeaseByRoomNumber(this.registerForm.value.roomNumber).subscribe((lease) => {
              this.rs.addNewLeaseToRoom(lease).subscribe((check) => {
                if (!check.success) {
                  alert('Lease Creation failed2222!!');
                  return;
                } else {
                  const date = new Date(lease.leaseStartDate);
                  const balance = Math.min(lease.rent, (30 - date.getDate() + 1) * lease.rent / 30).toFixed(2);
                  this.rs.changeRoomBalance({roomNumber: room.roomNumber, remainedBalance: (parseInt(balance, 10) + lease.deposit)} as Room).subscribe((res2) => {
                    if (!res2.success) {
                      alert('Bad!');
                    } else {
                      localStorage.removeItem('createLeaseRoomNumber');
                      this.router.navigate(['manager/get-room']);
                      alert('Lease with ' + this.registerForm.value.partyA + ' has been created successfully!!');
                      return;
                    }
                  });
                }
              });
            });
          } else {
            alert('Lease creation failed!!');
          }
        });
      }
    });
  }

  handleFileInput(files: FileList, check) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
    if (check === 'employmentLetterForm') {
      this.employmentLetterForm.value.employmentLetter = this.fileToUpload.name;
    } else if (check === 'BankStatementForm') {
      this.BankStatementForm.value.bankStatement = this.fileToUpload.name;
    } else if (check === 'taxFromForm') {
      this.taxFromForm.value.taxFrom = this.fileToUpload.name;
    } else if (check === 'photoIdentificationForm') {
      this.photoIdentificationForm.value.photoIdentification = this.fileToUpload.name;
    } else if (check === 'leaseCopyForm') {
      this.leaseCopyForm.value.leaseCopy = this.fileToUpload.name;
    }
    console.log(this.fileToUpload);
    // this.fs.uploadFile(this.fileToUpload).subscribe((res) => {
    //   if (res.success) {
    //     alert('Good!');
    //   } else {
    //     alert('Bad!');
    //   }
    // });
    this.upload(this.fileToUpload);
    if (this.info !== '') {
      alert(this.info);
    }
  }

  upload(file) {
    this.info = '';
    const mf: MSIFile = new MSIFile();
    mf.name = file.name;
    mf.contents = file;
    this.fs.upload(mf)
      .subscribe(res => {
        if (res.success === true) {
          this.info = 'Uploaded!';
          this.fs.load();
        } else if (res.success === false){
          this.info = 'Something went wrong!';
        }
      });
  }

  get f() { return this.registerForm.controls; }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'url(\'https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png\')';
  }

}
