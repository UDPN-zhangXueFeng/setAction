import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandTransactionRoutingModule } from './sand-transaction-routing.module';

@NgModule({
  imports: [SharedModule, SandTransactionRoutingModule],
})
export class SandTransactionModule {}
