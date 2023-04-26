import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent, ContactUsComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
