import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectivePreloadingStrategyService } from '@core/services/common/selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: '/login/login-modify', pathMatch: 'full' },
  { path: 'blank', loadChildren: () => import('./layout/blank/blank.module').then(m => m.BlankModule) },
  { path: 'login', data: { preload: true }, loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  // { path: 'sand-contact', loadChildren: () => import('./pages/sand-contact/sand-contact.module').then(m => m.SandContactModule) },
  { path: 'vn', data: { preload: true }, loadChildren: () => import('./pages/sand-vn-node/sand-vn-node.module').then(m => m.SandVnNodeModule) },
  { path: 'sand-box', data: { preload: true }, loadChildren: () => import('./layout/default/default.module').then(m => m.DefaultModule) },

  { path: '**', redirectTo: '/login/login-modify' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategyService,
      scrollPositionRestoration: 'top',
      // initialNavigation: 'enabledBlocking',
      // useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
