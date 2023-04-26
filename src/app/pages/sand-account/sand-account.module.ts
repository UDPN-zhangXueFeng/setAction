import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandAccountRoutingModule } from './sand-account-routing.module';

@NgModule({
  imports: [SharedModule, SandAccountRoutingModule],
})
export class SandAccountModule {}
