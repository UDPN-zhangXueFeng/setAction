import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { key: 'login', shouldDetach: 'no' },
    children: [
      { path: '', redirectTo: '/login/login-modify', pathMatch: 'full' },
      // {
      //   path: 'login-form',
      //   data: { preload: true },
      //   loadChildren: () => import('./login-form/login-form.module').then(m => m.LoginFormModule)
      // },
      // {
      //   path: 'register-form',
      //   loadChildren: () => import('./register-form/register-form.module').then(m => m.RegisterFormModule)
      // },
      {
        path: 'login-modify',
        loadChildren: () => import('./login-modify/login-modify-routing.module').then(m => m.LoginModifyRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
