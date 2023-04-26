import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { AccessCurrencyRoutingModule } from './access-currency-routing.module';
import { AccessCurrencyComponent } from './access-currency.component';


@NgModule({
  declarations: [AccessCurrencyComponent],
  imports: [
    SharedModule,
    AccessCurrencyRoutingModule
  ]
})
export class AccessCurrencyModule { }
