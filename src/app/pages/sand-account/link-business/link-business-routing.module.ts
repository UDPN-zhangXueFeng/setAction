import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkBusinessComponent } from './link-business.component';

const routes: Routes = [{ path: '', component: LinkBusinessComponent, data: { title: 'Link UDPN DID to Business Account', key: 'business' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkBusinessRoutingModule { }
