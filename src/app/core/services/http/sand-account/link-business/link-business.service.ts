import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class LinkBusinessService {
  constructor(private http: HttpClient) { }
  list(
    pageIndex: number,
    pageSize: number,
    filters: any
  ): Observable<any> {
    const data: any = {
      businessAccount: filters.businessAccount || '',
      did: filters.did || '',
    };
    data.inPage = {
      pageSize: pageSize,
      pageNum: pageIndex
    };
    return this.http.post('/v1/udpn/processing/business/account/bind/manage/searchs', data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  add(Request: any): Observable<any> {
    const data = {
      businessAccount: Request.businessAccount || '',
      did: Request.did || ''
    };
    return this.http.post('/v1/udpn/processing/business/account/bind/manage/save', data)
    .pipe(
      map((Response: any) => {
        return Response;
      })
    );
  }

  edit(Request: any): Observable<any> {
    const data = {
      bindingId: Request.bindingId || '',
      businessAccount: Request.businessAccount || '',
      did: Request.did || ''
    };
    return this.http.post('/v1/udpn/processing/business/account/bind/manage/edit', data)
    .pipe(
      map((Response: any) => {
        return Response;
      })
    );
  }

  unbind(Request: any): Observable<any> {
    const data = {
      bindingId: Request.bindingId || '',
    };
    return this.http.post('/v1/udpn/processing/business/account/bind/manage/delete', data)
    .pipe(
      map((Response: any) => {
        return Response;
      })
    );
  }

}
