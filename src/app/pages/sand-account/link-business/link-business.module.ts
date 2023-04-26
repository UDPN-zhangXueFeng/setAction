import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { LinkBusinessRoutingModule } from './link-business-routing.module';
import { LinkBusinessComponent } from './link-business.component';


@NgModule({
  declarations: [LinkBusinessComponent],
  imports: [
    SharedModule,
    LinkBusinessRoutingModule
  ]
})
export class LinkBusinessModule { }
