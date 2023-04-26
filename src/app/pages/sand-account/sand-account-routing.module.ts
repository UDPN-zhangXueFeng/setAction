import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  {
    path: 'upload',
    data: { preload: true },
    loadChildren: () => import('./did-upload/did-upload.module').then(m => m.DidUploadModule)
  },
  {
    path: 'generation',
    data: { preload: true },
    loadChildren: () => import('./did-generation/did-generation.module').then(m => m.DidGenerationModule)
  }, 
  {
    path: 'digital',
    data: { preload: true },
    loadChildren: () => import('./link-digital/link-digital.module').then(m => m.LinkDigitalModule)
  },
  {
    path: 'business',
    data: { preload: true },
    loadChildren: () => import('./link-business/link-business.module').then(m => m.LinkBusinessModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandAccountRoutingModule { }
