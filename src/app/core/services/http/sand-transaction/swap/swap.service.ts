import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SwapService {
  constructor(private http: HttpClient) { }
  search(Request: any): Observable<any> {

    const data = {
      beneficiaryName: Request.beneficiaryName,
      beneficiaryType: Request.beneficiaryType,
      did: Request.senderDid,
      formPlatformType: Request.blockChain[1],
      fromBankAccount: Request.senderBank,
      fromCurrencyType: Request.blockChain[0],
      sourceAccountAddress: Request.senderAccount,
      swapAmount: Request.senderAmount,
      targetAccountAddress: Request.beneficiaryAccount,
      toBankAccount: Request.beneficiaryBank === 'none' ? "" : Request.beneficiaryBank,
      toCurrencyType: Request.targetBlockChain[0],
      toPlatformType: Request.targetBlockChain[1]
    };

    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/searchs', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  deal(Request: any): Observable<any> {
    const data = {
      maxChannelFee: Request.maxChannelFee || '',
      allowMaxChannelFee: Request.allowMaxChannelFee || '',
      channelFeePrecision: Request.channelFeePrecision,
      channelFee: Request.channelFee,
      channelCurrency: Request.channelCurrency || '',
      channelPlatform: Request.channelPlatform || '',
      estimatedChannelFee: Request.estimatedChannelFee || '',
      toPlatformType: Request.toPlatformType || '',
      fromPlatformType: Request.fromPlatformType || '',
      did: Request.did || '',
      fromCurrencyType: Request.fromCurrencyType || '',
      fxRate: Request.fxRate || '',
      key: Request.key || '',
      originalTnCode: Request.originalTnCode || '',
      serviceFee: Request.serviceFee || '',
      vnServiceFee: Request.vnServiceFee || '',
      originalTnServiceFee: Request.originalTnServiceFee || '',
      targetTnServiceFee: Request.targetTnServiceFee || '',
      sourceAccountAddress: Request.sourceAccountAddress || '',
      swapAmount: Request.swapAmount || '',
      targetAccountAddress: Request.targetAccountAddress || '',
      tnSecurityMsg: Request.tnSecuryMsg || '',
      toCurrencyType: Request.toCurrencyType || '',
      targetTnCode: Request.targetTnCode || '',

      beneficiaryName: Request.beneficiaryName || '',
      beneficiaryType: Request.beneficiaryType || '',
      fromBankAccount: Request.fromBankAccount || '',
      toAmount: Request.toAmount || '',
      toBankAccount: Request.toBankAccount || '',
      totalAmount: Request.totalAmount || '',
    };

    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/save', data)
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
  getPermit(Request: any): Observable<any> {
    const data = {
      privateKey: Request.privateKey || '',
      serviceFee: Request.serviceFee || '',
      sourceAccountAddress: Request.sourceAccountAddress || '',
      transAmount: Request.transAmount || '',
      originalTnCode: Request.originalTnCode || '',
      swap:Request.swap,
      targetAccountAddress:Request.targetAccountAddress || '',
    };

    return this.http.post('/v1/udpn/processing/digital/currency/swap/manage/permit/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getDid(Request: any): Observable<any> {
    const data = {
      businessAccount: Request.businessAccount || '',
    };

    return this.http.post('/v1/udpn/processing/business/account/bind/manage/did/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getAccountVal(Request: any): Observable<any> {
    const data = {
      businessAccount: Request.businessAccount || '',
      currencyType: Request.currencyType || '',
      platformType: Request.platformType || '',
    };

    return this.http.post('/v1/udpn/processing/business/account/bind/manage/currency/account/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getAccount(Request: any): Observable<any> {
    const data = {
      did: Request.did || '',
      currencyType: Request.currencyType || '',
      platformType: Request.platformType || '',
    };

    return this.http.post('/v1/udpn/processing/business/account/bind/manage/currency/account/select', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchTypes(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/currency/platform/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }


  bnFetchTypes(): Observable<any> {
    return this.http.post('/v1/udpn/processing/common/manage/active/currency/platform/select', {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
