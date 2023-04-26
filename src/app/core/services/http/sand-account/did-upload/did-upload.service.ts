import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DidUploadService {
  constructor(private http: HttpClient) { }
  upload(Request: any): Observable<any> {
    const data = {
      didDocument: Request.didDocument || ""
    };
    return this.http.post('/v1/udpn/processing/did/manage/did/document/upload', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
