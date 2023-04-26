import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './info/info.component';
import { SignatureComponent } from './signature/signature.component';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';


@NgModule({
  declarations: [TransferComponent, InfoComponent, SignatureComponent],
  imports: [
    SharedModule,
    TransferRoutingModule
  ]
})
export class TransferModule { }
