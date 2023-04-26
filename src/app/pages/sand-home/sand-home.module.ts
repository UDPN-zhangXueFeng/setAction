import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SandHomeRoutingModule } from './sand-home-routing.module';

@NgModule({
  imports: [SharedModule, SandHomeRoutingModule],
})
export class SandHomeModule {}
