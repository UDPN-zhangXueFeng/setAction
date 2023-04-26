import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class LinkDigitalService {

  constructor(private http: HttpClient) { }

  add(addRequest: any): Observable<any> {
    const data = {
      briefIntroduction: addRequest.briefIntroduction,
      currencyAccount: addRequest.currencyAccount,
      currencyType: addRequest.currencyType,
      did: addRequest.did,
      isDefault: addRequest.isDefault,
      platformType: [addRequest.platformType]
    };
    return this.http.post('/v1/udpn/processing/account/bind/manage/save', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  list(
    pageIndex: number,
    pageSize: number,
    filters: any
  ): Observable<any> {
    const data: any = {
      currencyAccount: filters.currencyAccount || "",
      currencyType: filters.currencyType || "",
      platformType: filters.platformType || "",
      did: filters.did || null,
    };
    data.inPage = {
      pageSize: pageSize,
      pageNum: pageIndex
    };
    return this.http.post('/v1/udpn/processing/account/bind/manage/searchs', data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  default(defRequest: any):Observable<any>{
    const data = {
      accountBindingId:defRequest.accountBindingId||"",
      isDefault: 1
    };
    return this.http.post('/v1/udpn/processing/account/bind/manage/set/default',data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  unbind(unbindRequest: any): Observable<any> {
    const data = {
      accountBindingId: unbindRequest.accountBindingId || ""
    };
    return this.http.post('/v1/udpn/processing/account/bind/manage/delete', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  currencyApi():Observable<any>{
    const data = {};
    return this.http.post('/v1/udpn/processing/common/manage/currency/type/select',data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  platformApi():Observable<any>{
    const data = {};
    return this.http.post('/v1/udpn/processing/common/manage/platform/type/select',data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getTypes(): Observable<any> {
    return this.http.post('/v1/udpn/member/common/search/currency/platform', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  bnFetchTypes(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/currency/platform/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  bnActiveTypes(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/active/currency/platform/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  currencyActive():Observable<any>{
    const data = {};
    return this.http.post('/v1/udpn/processing/common/manage/active/currency/type/select',data)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
