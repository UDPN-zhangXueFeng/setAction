import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { LoginModifyComponent } from './login-modify/login-modify.component';
import { NormalLoginComponent } from './login-modify/normal-login/normal-login.component';
import { RegistLoginComponent } from './login-modify/regist-login/regist-login.component';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent, LoginModifyComponent,NormalLoginComponent,RegistLoginComponent],
  imports: [SharedModule, LoginRoutingModule]
})
export class LoginModule {}
