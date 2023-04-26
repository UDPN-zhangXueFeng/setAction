import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';


@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    SharedModule,
    AnalysisRoutingModule
  ]
})
export class AnalysisModule { }
