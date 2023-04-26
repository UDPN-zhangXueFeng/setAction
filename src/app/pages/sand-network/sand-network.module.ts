import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandNetworkRoutingModule } from './sand-network-routing.module';

@NgModule({
  imports: [SharedModule, SandNetworkRoutingModule],
})
export class SandNetworkModule {}
