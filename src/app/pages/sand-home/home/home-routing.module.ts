import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent, data: { title: 'Home', key: 'home' } 
  },
  { path: 'contactUs', component: ContactUsComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Contact Us', key: 'contactUs' } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
