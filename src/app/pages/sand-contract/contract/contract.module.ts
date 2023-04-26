import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [ContractComponent, InfoComponent],
  imports: [
    SharedModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }
