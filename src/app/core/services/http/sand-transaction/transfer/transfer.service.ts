import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }
  search(Request: any): Observable<any> {

    const data = {
      did: Request.senderDid || '',
      platformType: Request.blockChain[1] || '',
      currencyType: Request.blockChain[0] || '',
      sourceAccountAddress: Request.senderAccount || '',
      transferAmount: Request.senderAmount || '',
      targetAccountAddress: Request.beneficiaryAccount || '',

      beneficiaryName: Request.beneficiaryName || '',
      beneficiaryType: Request.beneficiaryType || '',
      fromBankAccount: Request.senderBank || '',
      toBankAccount: Request.beneficiaryBank === 'none' ? "" : Request.beneficiaryBank,

    };
    // const data = {
    //   sourceAccountAddress:Request.sourceAccountAddress,
    //   fromCurrencyType:Request.sourceCurrencyType,
    //   swapAmount:Request.swapAmount,
    //   targetAccountAddress:Request.targetAccountAddress,
    //   toCurrencyType:Request.targetCurrencyType
    // };

    return this.http.post('/v1/udpn/processing/transfer/manage/searchs', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  deal(Request: any): Observable<any> {
    const data = {
      // fxRate:Request.fxRate ||'',
      // userDid:Request.userDid||'',
      // message:Request.message||'',
      // originalTnCode:Request.originalTnCode||'',
      // serviceFee:Request.serviceFee||'',
      // sourceAccountAddress:Request.sourceAccountAddress||'',
      // sourceCurrencyType:Request.sourceCurrencyType||'',
      // swapAmount:Request.swapAmount||'',
      // targetAccountAddress:Request.targetAccountAddress||'',
      // targetCurrencyType:Request.targetCurrencyType||''
      maxChannelFee: Request.maxChannelFee || '',
      allowMaxChannelFee: Request.allowMaxChannelFee || '',
      channelFeePrecision: Request.channelFeePrecision,
      channelFee: Request.channelFee,
      channelCurrency: Request.channelCurrency || '',
      channelPlatform: Request.channelPlatform || '',
      estimatedChannelFee: Request.estimatedChannelFee || '',
      platformType: Request.toPlatformType || '',
      did: Request.did || '',
      currencyType: Request.toCurrencyType || '',
      key: Request.key || '',
      originalTnCode: Request.originalTnCode || '',
      serviceFee: Request.serviceFee || '',
      vnServiceFee: Request.vnServiceFee || '',
      originalTnServiceFee: Request.originalTnServiceFee || '',
      sourceAccountAddress: Request.sourceAccountAddress || '',
      transferAmount: Request.swapAmount || '',
      targetAccountAddress: Request.targetAccountAddress || '',
      tnSecurityMsg: Request.tnSecuryMsg || '',
      // tnSecurityMsg:'pending_discussion_which_sign_method_to_use',
      totalAmount: Request.totalAmount || '',

      beneficiaryName: Request.beneficiaryName || '',
      beneficiaryType: Request.beneficiaryType || '',
      fromBankAccount: Request.fromBankAccount || '',

      toBankAccount: Request.toBankAccount || '',

    };

    return this.http.post('/v1/udpn/processing/transfer/manage/save', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  fetchPlatFrom(): Observable<any> {

    return this.http.post('/v1/udpn/processing/common/manage/platform/currency/select', {}).pipe(
      map((response: any) => {
        return response
      })
    )
  }

  getAccounts(Request: any): Observable<any> {
    const data = {
      platformType: Request.platformType || '',
      currencyType: Request.currencyType || '',
      did: Request.did || '',
    };

    return this.http.post('/v1/udpn/processing/account/bind/manage/currency/account/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getPermit(Request: any): Observable<any> {
    const data = {
      privateKey: Request.privateKey || '',
      serviceFee: Request.serviceFee || '',
      sourceAccountAddress: Request.sourceAccountAddress || '',
      transAmount: Request.transAmount || '',
      originalTnCode: Request.originalTnCode || '',
    };

    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/permit/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getCurrency(Request: any): Observable<any> {
    const data = {
      did: Request.did || '',
    };

    return this.http.post('/v1/udpn/processing/account/bind/manage/currency/type/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
