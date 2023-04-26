import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'onboard', pathMatch: 'full' },
  {
    path: 'onboard',
    data: { preload: true },
    loadChildren: () => import('./bn-onboarding/bn-onboarding.module').then(m => m.BnOnboardingModule)
  },
  {
    path: 'currency',
    data: { preload: true },
    loadChildren: () => import('./access-currency/access-currency.module').then(m => m.AccessCurrencyModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandNetworkRoutingModule { }
