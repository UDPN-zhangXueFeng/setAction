import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandContractRoutingModule } from './sand-contract-routing.module';

@NgModule({
  imports: [SharedModule, SandContractRoutingModule],
})
export class SandContractModule {}
