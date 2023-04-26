import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class VnNodeService {

  constructor(private http: HttpClient, private date: DatePipe) { }
  search(
    pageIndex: number,
    pageSize: number,
    filters: any
  ): Observable<any> {
    const data: any = {
      did: filters.did || "",
      fromCurrencyType: filters.fromCurrencyType || "",
      fromPlatformType: filters.fromPlatformType || "",
      instance: filters.instance || "",
      status: filters.status || "",
      submitEndDate:  this.date.transform(filters.createTime[1], 'yyyy-MM-dd HH:mm:ss') || "",
      submitStartDate:  this.date.transform(filters.createTime[0], 'yyyy-MM-dd HH:mm:ss') || "",
      toCurrencyType: filters.toCurrencyType || "",
      toPlatformType: filters.toPlatformType || "",
      transactionKey: filters.transactionKey || "",
      transactionType: filters.transactionType || "",
    };
    data.inPage = {
      pageSize: pageSize,
      pageNum: pageIndex
    }
    return this.http.post('/v1/udpn/transaction/swap/manage/all/transaction/searches', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getInfo(Rquest: any): Observable<any> {
    const data = {
      transactionKey: Rquest.transactionKey,
      transactionType: Rquest.transactionType,
    };
    // const data = {
    //   transactionKey: 'VN2222_BN0000001_e199565a927d46059d76bc5234dbd1c11652317861441',
    //   transactionType: '2',
    // };
    return this.http.post('/v1/udpn/transaction/swap/manage/all/transaction/detail', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getPlatm(): Observable<any> {
    return this.http.post('/v1/udpn/member/common/platform/type/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getCurry(): Observable<any> {
    return this.http.post('/v1/udpn/member/common/currency/type/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getFetchTypes(): Observable<any> {
    return this.http.post('/v1/udpn/member/common/search/used/currency/platform', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
