import { Inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';
import { MENU_TOKEN } from '@app/config/menu';

export interface UserLogin {
  name: string;
  password: string;
}

export interface UserLogins {
  clientName: string;
  pwd: string;
}


export interface UserPre {
  loginName: string
}

export interface ResourceList {
  resourceCode: string;
  resourceLevel: string;
}

export interface PermissionData {
  userId: number;
  userName: string;
  resourceList: ResourceList;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: BaseHttpService,
    @Inject(MENU_TOKEN) public menus: Menu[],
    private menuService: MenusService
  ) { }

  // public login(params: UserLogin): Observable<string> {
  //   return this.http.post('/login', params, { needSuccessInfo: false });
  // }

  public login(params: UserLogins): Observable<any> {
    return this.http.post(`/v1/udpn/processing/login/manage/login`, params, { needSuccessInfo: false });
  }
  
  // register
  public register(params: UserLogins): Observable<any> {
    return this.http.post(`/v1/udpn/processing/register/manage/register`, params, { needSuccessInfo: false });
  }
  public getMenuByUserId(): Observable<Menu[]> {
    return of(this.menus);
  }

  // 获取用户权限菜单
  public getUserPermission(params: UserPre): Observable<PermissionData> {
    return this.http.post(`/v1/udpn/member/user/manage/selectByLoginName`, params);
  }

  // 获取bn名称
  public fetchBnName(): Observable<any> {
    return this.http.post(`/v1/udpn/processing/login/manage/instance/select`, {});
  }
  // 获取用户信息
  public fetchUserName(): Observable<any> {
    return this.http.post(`/v1/udpn/processing/user/manage/login/user/info/select`, {});
  }
  // 退出登录
  public loginOut(): Observable<any> {
    return this.http.post(`/v1/udpn/processing/login/manage/login/out`, {});
  }
}
