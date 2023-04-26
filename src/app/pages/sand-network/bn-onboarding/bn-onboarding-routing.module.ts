import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { BnOnboardingComponent } from './bn-onboarding.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: '', component: BnOnboardingComponent, data: { title: 'BN Onboarding and Configuration', key: 'onboard' } },
  { path: 'info', component: InfoComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'BN Onboarding and Configuration-Info', key: 'info' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BnOnboardingRoutingModule { }
