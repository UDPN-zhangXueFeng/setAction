import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { InfoComponent } from './info/info.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  { path: '', component: TransactionsComponent, data: { title: 'Transactions Search', key: 'transactions' } },
  { path: 'info', component: InfoComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Transactions Search-Info', key: 'info' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
