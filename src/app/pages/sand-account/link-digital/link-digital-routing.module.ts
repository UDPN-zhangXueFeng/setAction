import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { AddComponent } from './add/add.component';
import { LinkDigitalComponent } from './link-digital.component';

const routes: Routes = [
  {path: '', component: LinkDigitalComponent, data: { title: 'Link Digital Currency Account to UDPN DID', key: 'digital' }},
  { path: 'add', component: AddComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Link Digital Currency Account to UDPN DID-Add', key: 'add' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkDigitalRoutingModule { }
