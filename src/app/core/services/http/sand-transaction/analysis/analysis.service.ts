import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }
  amount(addRequest: any): Observable<any> {
    const data = {
      currencyType: addRequest.currencyType || "",
      platformType: addRequest.platformType || "",
      transDateType: addRequest.transDateType || "",
      transType: addRequest.transType || "",
    };

    return this.http.post('/v1/udpn/processing/transfer/manage/transaction/amount/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  number(addRequest: any): Observable<any> {
    const data = {
      currencyType: addRequest.currencyType || "",
      platformType: addRequest.platformType || "",
      transDateType: addRequest.transDateType || "",
      transType: addRequest.transType === 'All' ? '' : addRequest.transType,
    };

    return this.http.post('/v1/udpn/processing/transfer/manage/transaction/number/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
