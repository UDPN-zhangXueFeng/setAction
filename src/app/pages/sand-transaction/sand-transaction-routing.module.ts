import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'transfer', pathMatch: 'full' },
  {
    path: 'transfer',
    data: { preload: true },
    loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferModule)
  }, 
  {
    path: 'swap',
    data: { preload: true },
    loadChildren: () => import('./swap/swap.module').then(m => m.SwapModule)
  },
  {
    path: 'transactions',
    data: { preload: true },
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'search',
    data: { preload: true },
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'analysis',
    data: { preload: true },
    loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandTransactionRoutingModule { }
