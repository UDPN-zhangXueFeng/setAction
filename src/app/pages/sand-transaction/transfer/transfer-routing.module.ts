import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { InfoComponent } from './info/info.component';
import { TransferComponent } from './transfer.component';

const routes: Routes = [
  { path: '', component: TransferComponent, data: { title: 'Transfer', key: 'transfer' } },
  { path: 'info', component: InfoComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Transfer-Info', key: 'tansferInfo' } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
