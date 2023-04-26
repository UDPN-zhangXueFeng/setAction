import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandVnNodeRoutingModule } from './sand-vn-node-routing.module';

@NgModule({
  imports: [SharedModule, SandVnNodeRoutingModule],
})
export class SandVnNodeModule {}
