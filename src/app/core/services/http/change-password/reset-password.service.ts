import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  resetPassword(Request: any): Observable<any> {
    const data = {
      newPwd: Request.newPwd || '',
      oldPwd: Request.oldPwd || '',
      verifyPwd: Request.verifyPwd || '',
    };
    return this.http.post('/v1/udpn/processing/user/manage/password/update', data)
      .pipe(
        map((Response: any) => {
          return Response;
        })
      );
  }
}
