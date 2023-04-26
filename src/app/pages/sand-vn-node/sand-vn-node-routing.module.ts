import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'vnNode', pathMatch: 'full' },
  {
    path: 'vnNode',
    data: { preload: true },
    loadChildren: () => import('./vn-node/vn-node.module').then(m => m.VnNodeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandVnNodeRoutingModule { }
