import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AddComponent } from './add/add.component';

import { LinkDigitalRoutingModule } from './link-digital-routing.module';
import { LinkDigitalComponent } from './link-digital.component';


@NgModule({
  declarations: [LinkDigitalComponent, AddComponent],
  imports: [
    SharedModule,
    LinkDigitalRoutingModule
  ]
})
export class LinkDigitalModule { }
