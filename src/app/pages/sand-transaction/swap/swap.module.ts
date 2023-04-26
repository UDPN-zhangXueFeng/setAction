import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './info/info.component';
import { SignatureComponent } from './signature/signature.component';

import { SwapRoutingModule } from './swap-routing.module';
import { SwapComponent } from './swap.component';


@NgModule({
  declarations: [SwapComponent, InfoComponent, SignatureComponent],
  imports: [
    SharedModule,
    SwapRoutingModule
  ]
})
export class SwapModule { }
