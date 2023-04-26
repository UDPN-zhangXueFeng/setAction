import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, TimeoutError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { TokenKey } from '@config/constant';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginInOutService } from '../common/login-in-out.service';
import { environment, localUrl } from '@env/environment';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  reLoginCode: any = null;

  constructor(private windowServe: WindowService, public message: NzMessageService, private loginOutService: LoginInOutService, private modal: NzModalService, private translate: TranslateService, private router: Router) { }

  intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const token = this.windowServe.getSessionStorage(TokenKey);
    let httpConfig: CustomHttpConfig = {};
    if (!!token) {
      // httpConfig = { headers: req.headers.set(TokenKey, token) };
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(this.performRequest(copyReq)).pipe(
      filter(e => e.type !== 0),
      map((res) => this.handleSuccess(res)),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    if (error instanceof TimeoutError) {
      this.modal.error({
        nzTitle: "Error",
        nzContent: "the request has timed out !"
      });
    }
    let errMsg = '';
    if (status === 0) {
      errMsg = '网络出现未知的错误，请检查您的网络。';
    }
    if (status >= 300 && status < 400) {
      errMsg = `请求被服务器重定向，状态码为${status}`;
    }
    if (status >= 400 && status < 500) {
      errMsg = `客户端出错，可能是发送的数据有误，状态码为${status}`;
    }
    if (status >= 500) {
      errMsg = `服务器发生错误，状态码为${status}`;
      this.modal.error({
        nzTitle: "Error",
        nzContent: "Encounter an internal error, please contact VN admin with message code: 50000 !"
      });
    }
    return throwError({
      code: status,
      message: errMsg
    });

  }

  private handleSuccess(event: any): HttpResponse<any> {
    const filterCode = [0, 200, 304];
    const otherFilterCode = [20111, 20117, 20106, 20107, 20108, 22013, 22024, 20210, 22034, 20224];
    if (event instanceof HttpResponse) {
      if (event.url !== undefined && event.url !== null && event.url.indexOf('.json') !== -1) {
        return event;
      }
      if (event.status === 200 && event.body.hasOwnProperty('code')) {
        if (filterCode.includes(event.body.code)) {
          return event;
        }
        if (event.body.code === -1) {
          this.modal.error({
            nzTitle: "Error",
            nzContent: "System error, please try again later !"
          });
          return event;
        }

        if (event.body.code === 50000) {
          this.modal.error({
            nzTitle: "Error",
            nzContent: "Encounter an internal error, please contact VN admin with message code: 50000 !"
          });
          return event;
        }
        if (event.body.code === 20149) {
          // sessionStorage.removeItem('loginStatus');
          this.windowServe.clearStorage();
          this.windowServe.clearSessionStorage();
          this.loginOutService.loginOut().then(_ => {
            this.router.navigateByUrl('/login/login-modify')
          });
        }
        if (otherFilterCode.includes(event.body.code)) {
          this.modal.error({
            nzTitle: 'error',
            nzContent: this.translate.instant(`MSG_${event.body.code}`, { value: event.body.data })
          });
          return event;
        }
        if (event.body.code === 20170 || event.body.code === 20171) {
          this.modal.error({
            nzTitle: 'error',
            nzContent: this.translate.instant(`MSG_${event.body.code}`, { value: event.body.data[0], value1: event.body.data[1] })
          })
        }
        if (event.body.code === 20133) {
          this.modal.error({
            nzTitle: "Error",
            nzContent: "The email format is incorrect,please enter the correct email !"
          });
          return event;
        }
        if (event.body.code !== 20149) {
          this.modal.error({
            nzTitle: 'error',
            nzContent: this.translate.instant(`MSG_${event.body.code}`)
          })
        } else {
          if (!this.reLoginCode) {
            this.reLoginCode = this.modal.error({
              nzTitle: 'error',
              nzContent: this.translate.instant(`MSG_${event.body.code}`)
            });
          }
        }
        // this.modal.error({
        //   nzTitle: 'error',
        //   nzContent: this.translate.instant(`MSG_${event.body.code}`)
        // });
        // return event;
      }
    }
    return event;
  }
  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    const headers: HttpHeaders = req.headers;
    if (environment.production) {
      return req.clone({ url: `${localUrl}${req.url}`, headers });
    } else {
      return req.clone({ url: `${req.url}`, headers });
    }
  }
}
