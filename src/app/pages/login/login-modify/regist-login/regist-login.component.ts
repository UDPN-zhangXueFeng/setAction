import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';

import { TokenKey, TokenKeyDefault, TokenPre } from '@config/constant';
import { DestroyService } from '@core/services/common/destory.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@services/login/login.service';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { LoginType } from '../login-modify.component';
import { fnCheckForm } from '@app/utils/tools';
import { LoginInOutService } from '@app/core/services/common/login-in-out.service';
import { NzMessageService } from 'ng-zorro-antd/message';


/*https://www.npmjs.com/package/angular-password-strength-meter*/
@Component({
  selector: 'app-regist-login',
  templateUrl: './regist-login.component.html',
  styleUrls: ['./regist-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class RegistLoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;

  instance!: string;
  hasUser!: boolean;

  constructor(
    private destroy$: DestroyService,
    private userInfoService: UserInfoService,
    private router: Router,
    private loginInOutService: LoginInOutService,
    private menuService: MenuStoreService,
    private dataService: LoginService,
    private windowServe: WindowService,
    private spinService: SpinService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private login1StoreService: Login1StoreService,
    private message: NzMessageService
  ) { }

  submitForm(): void {
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();
    // register
    this.dataService.register(param).pipe(
      finalize(() => {
        this.spinService.setCurrentGlobalSpinStore(false);
      })
    ).subscribe(result => {
      this.loginInOutService.loginIn(TokenKeyDefault).then(() => {
        this.message.success('Sign up successfully!').onClose!.subscribe(() => {
          sessionStorage.setItem('clientName', param.clientName);
          sessionStorage.setItem('instance', this.instance);
          this.router.navigateByUrl('/sand-box/sand-home');
        });

      })
    })
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.getBnName();
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isOverModel = res;
        this.cdr.markForCheck();
      });
    this.validateForm = this.fb.group({
      clientName: ['', [Validators.required]],
      password: ['', [Validators.required, this.pwdValidator]],
      confirmPassword: ['', [Validators.required, this.pwdConfimValidator]],
      isAgree: [true, [Validators.required]]
    });
  }

  pwdValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (!(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,20}$/).test(control.value)) {
      return { regular: true, error: true };
    }
    return {};
  };
  pwdConfimValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { regular: true, error: true };
    }
    return {};
  };
  getBnName() {
    this.dataService.fetchBnName().subscribe(res => {
      this.instance = res.instance;
      this.hasUser = res.hasUser;
      this.cdr.markForCheck();
    })
  }
}
