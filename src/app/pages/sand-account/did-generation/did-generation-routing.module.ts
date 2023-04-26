import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DidGenerationComponent } from './did-generation.component';

const routes: Routes = [{ path: '', component: DidGenerationComponent, data: { title: 'DID generation', key: 'generation' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DidGenerationRoutingModule { }
