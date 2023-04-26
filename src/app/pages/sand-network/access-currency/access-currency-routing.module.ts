import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessCurrencyComponent } from './access-currency.component';

const routes: Routes = [{ path: '', component: AccessCurrencyComponent, data: { title: 'Access Digital Currencies', key: 'currency' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessCurrencyRoutingModule { }
