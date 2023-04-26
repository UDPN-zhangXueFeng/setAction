import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search(Request: any): Observable<any> {
    const data = {
      key: Request.key,
    };
    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/transaction/by/key/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
