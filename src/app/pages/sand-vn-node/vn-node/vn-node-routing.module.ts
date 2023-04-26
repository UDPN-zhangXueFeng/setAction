import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { InfoComponent } from './info/info.component';
import { VnNodeComponent } from './vn-node.component';

const routes: Routes = [
  { 
    path: '', component: VnNodeComponent, data: { title: 'VN Node', key: 'vnNode' } 
  },
  { 
    path: 'info', component: InfoComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'VN Node-Info', key: 'info' } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VnNodeRoutingModule { }
