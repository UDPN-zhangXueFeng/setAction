import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SandContactRoutingModule } from './sand-contact-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SandContactRoutingModule,
  ],
})
export class SandContactModule { }
