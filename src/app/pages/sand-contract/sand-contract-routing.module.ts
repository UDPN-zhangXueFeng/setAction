import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'contract', pathMatch: 'full' },
  {
    path: 'contract',
    data: { preload: true },
    loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandContractRoutingModule { }
