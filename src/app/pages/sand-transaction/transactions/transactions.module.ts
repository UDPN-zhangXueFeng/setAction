import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './info/info.component';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';


@NgModule({
  declarations: [TransactionsComponent, InfoComponent],
  imports: [
    SharedModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
