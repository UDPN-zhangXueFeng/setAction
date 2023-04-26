import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { BnOnboardingRoutingModule } from './bn-onboarding-routing.module';
import { BnOnboardingComponent } from './bn-onboarding.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [BnOnboardingComponent, InfoComponent],
  imports: [
    SharedModule,
    BnOnboardingRoutingModule
  ]
})
export class BnOnboardingModule { }
