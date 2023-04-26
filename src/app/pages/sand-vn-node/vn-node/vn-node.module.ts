import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './info/info.component';

import { VnNodeRoutingModule } from './vn-node-routing.module';
import { VnNodeComponent } from './vn-node.component';


@NgModule({
  declarations: [VnNodeComponent, InfoComponent],
  imports: [
    SharedModule,
    VnNodeRoutingModule
  ]
})
export class VnNodeModule { }
