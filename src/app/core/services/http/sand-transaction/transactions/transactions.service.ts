import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

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
      fromSubmitTime: this.date.transform(filters.createTime[0], 'yyyy-MM-dd HH:mm:ss') || "",
      toCurrencyType: filters.toCurrencyType || "",
      toPlatformType: filters.toPlatformType || "",
      toSubmitTime: this.date.transform(filters.createTime[1], 'yyyy-MM-dd HH:mm:ss') || "",
      transKey: filters.transKey || "",
      transStatus: filters.transStatus || "",
      transType: filters.transType || ""
    };
    data.inPage = {
      pageSize: pageSize,
      pageNum: pageIndex
    }
    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/swap/transfer/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getPlatm(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/platform/type/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getCurry(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/currency/type/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getInfo(Rquest: any): Observable<any> {
    const data = {
      transId: Rquest.transKey,
      transType: Rquest.transType,
    };

    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/swap/transfer/detail/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
