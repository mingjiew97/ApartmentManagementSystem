import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {MSIFile} from '../../modules/File';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('file', {static: true})
  file: ElementRef;
  info = '';
  document1;

  constructor(
    public fus: FileService
  ) { }

  ngOnInit() {
    this.fus.load();
  }

  onFileChange() {
    this.info = '';
    this.fus.resetProgress();
  }

  getDocument() {
    // this.fus.getDocumnet('payment2.jpg').subscribe((res) => {
    //   if (res !== null) {
    //     this.document1 = res;
    //   }
    // });
    this.document1 = 'http://localhost:8080/downloadFile/paymentBackGround.jpg';
  }

  upload() {
    this.info = '';
    if (this.file.nativeElement.files.length) {
      const f = this.file.nativeElement.files[0]; // single
      const mf: MSIFile = new MSIFile();
      mf.name = f.name;
      mf.contents = f;
      this.fus.upload(mf)
        .subscribe(res => {
          if (res.success === true) {
            this.info = 'Uploaded!';
            this.fus.load();
          } else if (res.success === false){
            this.info = 'Something went wrong!';
          }
        });
    } else {
      this.info = 'Select a file please!';
    }
  }

}
