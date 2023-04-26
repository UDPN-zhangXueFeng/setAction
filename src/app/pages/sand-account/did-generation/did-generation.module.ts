import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { DidGenerationRoutingModule } from './did-generation-routing.module';
import { DidGenerationComponent } from './did-generation.component';


@NgModule({
  declarations: [DidGenerationComponent],
  imports: [
    SharedModule,
    DidGenerationRoutingModule
  ]
})
export class DidGenerationModule { }
