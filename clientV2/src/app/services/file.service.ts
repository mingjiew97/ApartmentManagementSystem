import { Injectable } from '@angular/core';
import {Lease} from '../modules/Lease';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {MSIFile} from '../modules/File';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // constructor(
  //   private http: HttpClient
  // ) { }
  //
  // uploadFile(file: File): Observable<{success: boolean}> {
  //   const formData = new FormData();
  //   formData.append('upload', file);
  //
  //   const params = new HttpParams();
  //   const options = {
  //     params: params,
  //     reportProgress: true,
  //   };
  //
  //   return this.http.post<{success: boolean, lease: Lease}>(`${environment.API_URL}/uploadFile`, formData, options);
  // }

  private files$$: Subject<string[]> = new BehaviorSubject<string[]>([]);
  public files$: Observable<string[]>;
  private progress$$: Subject<number> = new BehaviorSubject<number>(0);
  public progress$: Observable<number>;

  private FILE_API_URL = `${environment.API_URL}/files`;

  constructor(
    public http: HttpClient
  ) {
    // this.files$ = this.files$$.asObservable().pipe(
    //   map(
    //     (files: string[]) => files.map(f =>`${environment.API_URL}/${f}`)
    //   )
    // );
    // this.progress$ = this.progress$$.asObservable();
  }

  upload(file: MSIFile): Observable<{success: any}> {
    const formData: FormData = new FormData();
    formData.append('file', file.contents, file.name);
    return this.http.post<{success: any}>(`${this.FILE_API_URL}/upload/${file.name}`, formData, {reportProgress: true, observe: 'events'})
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress$$.next(Math.round(event.loaded / event.total * 100));
              break;
            case HttpEventType.Response:
              return event.body;
            default:
              break;
          }
          return {
            success: 'in progress'
          };
        })
      );
  }

  realUpload(file: MSIFile): Observable<{success: any}> {
    const formData: FormData = new FormData();
    formData.append('file', file.name);
    return this.http.post<{success: any}>(`${environment.API_URL}/upload`, formData, {reportProgress: true, observe: 'events'})
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress$$.next(Math.round(event.loaded / event.total * 100));
              break;
            case HttpEventType.Response:
              return event.body;
            default:
              break;
          }
          return {
            success: 'in progress'
          };
        })
      );
  }

  getDocumnet(fileName: string): Observable<File> {
    return this.http.get<File>(`${environment.API_URL}/downloadFile/${fileName}`);
  }

  private list(): Observable<string[]> {
    return this.http.get<string[]>(`${this.FILE_API_URL}/list`);
  }

  load() {
    this.list().subscribe((files: string[]) => {
      this.files$$.next(files);
    });
  }

  resetProgress() {
    this.progress$$.next(0);
  }
}
