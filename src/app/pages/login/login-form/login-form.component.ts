import { environment } from '@env/environment';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@core/services/http/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnCheckForm, fnRandomString } from '@utils/tools';
import { TokenKeyDefault } from '@app/config/constant';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form-tmpl.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;
  instance!: string;
  constructor(
    private fb: FormBuilder,
    private loginInOutService: LoginInOutService,
    private menuService: MenuStoreService,
    private dataService: LoginService,
    private spinService: SpinService,
    private windowServe: WindowService,
    private userInfoService: UserInfoService,
    private router: Router
  ) { }

  submitForm(): void {
    // 校验表单
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();

    this.dataService.login(param).pipe(
      finalize(() => {
        this.spinService.setCurrentGlobalSpinStore(false);
      })
    ).subscribe(result => {
      this.loginInOutService.loginIn(TokenKeyDefault).then(() => {
        this.router.navigateByUrl('/sand-box/sand-home/home');
      })
    })
  }

  ngOnInit(): void {
    this.getBnName();
    this.validateForm = this.fb.group({
      clientName: ['admin', [Validators.required]],
      pwd: ['Abcd1234', [Validators.required]]
    });
  }

  getBnName(): void {
    this.dataService.fetchBnName().subscribe(res => {
      this.instance = (res as any).instance;
    })
  }
}
