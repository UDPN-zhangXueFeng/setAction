import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { ContractComponent } from './contract.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { 
    path: '', component: ContractComponent, data: { title: 'Contract Deployment', key: 'contract' } 
  },
  { 
    path: 'info', component: InfoComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Contract Deployment-Info', key: 'info' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
